import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";

import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";

import type { IBook } from "../types";
import {
  useCreateBookMutation,
  useGetBooksQuery,
} from "../redux/api/bookApi";

export default function CreateBookPage() {
  const navigate = useNavigate();
  const { data: booksData } = useGetBooksQuery(undefined);
  const [createBook, { isLoading }] = useCreateBookMutation();

  const {
    register,
    handleSubmit,
    watch,
    setError,
    setValue,
    formState: { errors },
    reset,
  } = useForm<Partial<IBook>>();

  const watchedISBN = watch("isbn");
  const watchedCopies = watch("copies");

  useEffect(() => {
    if (watchedCopies !== undefined) {
      setValue("available", Number(watchedCopies) > 0);
    }
  }, [watchedCopies, setValue]);

  useEffect(() => {
    if (watchedISBN && booksData?.data?.length) {
      const isDuplicate = booksData.data.some(
        (b) => b.isbn.trim() === watchedISBN.trim()
      );
      if (isDuplicate) {
        setError("isbn", {
          type: "manual",
          message: "ISBN already exists",
        });
      }
    }
  }, [watchedISBN, booksData, setError]);

  const onSubmit = async (data: Partial<IBook>) => {
    const payload: Partial<IBook> = {
      ...data,
      copies: Number(data.copies),
      available: Number(data.copies) > 0,
    };

    try {
      await createBook(payload).unwrap();
      toast.success("Book added successfully!");
      reset();
      navigate("/books");
    } catch (err) {
      toast.error(`Failed to add book: ${(err as Error).message}`);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 rounded-lg bg-background text-foreground border border-border shadow">
      <h2 className="text-2xl font-semibold mb-6 text-center">Add New Book</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Title */}
        <div>
          <Label htmlFor="title">Title</Label>
          <Input id="title" {...register("title", { required: "Required" })} />
          {errors.title && (
            <p className="text-sm text-destructive">{errors.title.message}</p>
          )}
        </div>

        {/* Author */}
        <div>
          <Label htmlFor="author">Author</Label>
          <Input id="author" {...register("author", { required: "Required" })} />
          {errors.author && (
            <p className="text-sm text-destructive">{errors.author.message}</p>
          )}
        </div>

        {/* Genre */}
        <div>
          <Label htmlFor="genre">Genre</Label>
          <select
            id="genre"
            {...register("genre", { required: "Genre is required" })}
            className="w-full border border-border bg-background text-foreground p-2 rounded-md"
          >
            <option value="">Select Genre</option>
            <option value="FICTION">Fiction</option>
            <option value="NON_FICTION">Non-fiction</option>
            <option value="SCIENCE">Science</option>
            <option value="HISTORY">History</option>
            <option value="BIOGRAPHY">Biography</option>
            <option value="FANTASY">Fantasy</option>
          </select>
          {errors.genre && (
            <p className="text-sm text-destructive">{errors.genre.message}</p>
          )}
        </div>

        {/* ISBN */}
        <div>
          <Label htmlFor="isbn">ISBN</Label>
          <Input id="isbn" {...register("isbn", { required: "Required" })} />
          {errors.isbn && (
            <p className="text-sm text-destructive">{errors.isbn.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <Label htmlFor="description">Description</Label>
          <Input id="description" {...register("description")} />
        </div>

        {/* Copies */}
        <div>
          <Label htmlFor="copies">Copies</Label>
          <Input
            type="number"
            id="copies"
            {...register("copies", {
              required: "Required",
              min: { value: 0, message: "Must be 0 or more" },
              valueAsNumber: true,
            })}
          />
          {errors.copies && (
            <p className="text-sm text-destructive">{errors.copies.message}</p>
          )}
        </div>

        {/* Available Status (readonly) */}
        <div>
          <Label htmlFor="available">Available</Label>
          <Input
            id="available"
            type="text"
            value={watch("available") ? "Yes" : "No"}
            readOnly
            className="bg-muted text-muted-foreground"
          />
        </div>

        {/* Submit */}
        <Button type="submit" className="w-full">
          {isLoading ? "Adding..." : "Add Book"}
        </Button>
      </form>
    </div>
  );
}
