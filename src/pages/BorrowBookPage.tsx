import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useEffect } from "react";

import { useGetSingleBookQuery } from "../redux/api/bookApi";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { useCreateBorrowMutation } from "../redux/api/borrowApi";

interface IBorrowForm {
  quantity: number;
  dueDate: string;
}

export default function BorrowBookPage() {
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useGetSingleBookQuery(bookId || "");
  const [createBorrow, { isLoading: isSubmitting }] = useCreateBorrowMutation();

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<IBorrowForm>();

  const book = data?.data;

  useEffect(() => {
    if (book) {
      reset(); // Optional: preload values
    }
  }, [book, reset]);

  const onSubmit = async (formData: IBorrowForm) => {
    if (!book) return;

    if (formData.quantity > book.copies) {
      setError("quantity", {
        type: "manual",
        message: "Quantity cannot exceed available copies.",
      });
      return;
    }

    try {
      await createBorrow({
        book: book._id!,
        quantity: formData.quantity,
        dueDate: formData.dueDate,
      }).unwrap();

      toast.success("Book borrowed successfully!");
      navigate("/borrow-summary");
    } catch (err) {
      toast.error(`Failed to borrow book. ${(err as Error).message}`);
    }
  };

  if (isLoading)
    return <p className="text-center mt-10 text-muted-foreground">Loading book data...</p>;

  if (isError || !book)
    return (
      <p className="text-center text-destructive mt-10">Failed to load book.</p>
    );

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-background text-foreground shadow border border-border rounded-md">
      <h2 className="text-xl font-semibold mb-6 text-center">
        Borrow: {book.title}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Quantity */}
        <div>
          <Label htmlFor="quantity">Quantity (Available: {book.copies})</Label>
          <Input
            type="number"
            id="quantity"
            {...register("quantity", {
              required: "Quantity is required",
              min: { value: 1, message: "Must borrow at least 1" },
            })}
          />
          {errors.quantity && (
            <p className="text-sm text-destructive mt-1">
              {errors.quantity.message}
            </p>
          )}
        </div>

        {/* Due Date */}
        <div>
          <Label htmlFor="dueDate">Due Date</Label>
          <Input
            type="date"
            id="dueDate"
            {...register("dueDate", {
              required: "Due date is required",
            })}
          />
          {errors.dueDate && (
            <p className="text-sm text-destructive mt-1">
              {errors.dueDate.message}
            </p>
          )}
        </div>

        <div className="flex justify-center">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Borrowing..." : "Confirm Borrow"}
          </Button>
        </div>
      </form>
    </div>
  );
}
