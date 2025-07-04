import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { toast } from "react-toastify";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

import {
  useGetSingleBookQuery,
  useUpdateBookMutation,
} from "../redux/api/bookApi";
import type { IBook } from "../types";

import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

export default function EditBookPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useGetSingleBookQuery(id || "");
  const [updateBook] = useUpdateBookMutation();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<IBook>();

  useEffect(() => {
    if (data?.data) {
      reset(data.data);
    }
  }, [data?.data, reset]);

  const onSubmit = async (formData: IBook) => {
    try {
      if (formData.copies < 0) {
        toast.error("Copies cannot be negative.");
        return;
      }

      const payload = {
        ...formData,
        available: formData.copies > 0,
      };

      await updateBook({ id: id!, data: payload }).unwrap();
      toast.success("Book updated successfully!");
      navigate("/books");
    } catch (err) {
      toast.error(`Failed to update book: ${(err as Error).message}`);
    }
  };

  if (isLoading)
    return (
      <p className="text-center mt-10 text-muted-foreground">Loading...</p>
    );

  if (isError || !data?.data)
    return (
      <p className="text-center text-destructive mt-10">Failed to load book.</p>
    );

  return (
    <div className="max-w-3xl mx-auto p-6 bg-background text-foreground border border-border shadow-sm mt-10 rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center">Edit Book</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5 max-w-xl mx-auto"
      >
        {/* Title */}
        <div className="space-y-1">
          <Label htmlFor="title">Title</Label>
          <Input id="title" {...register("title", { required: true })} />
          {errors.title && (
            <p className="text-sm text-destructive">Title is required</p>
          )}
        </div>

        {/* Author of book */}
        <div className="space-y-1">
          <Label htmlFor="author">Author</Label>
          <Input id="author" {...register("author", { required: true })} />
          {errors.author && (
            <p className="text-sm text-destructive">Author is required</p>
          )}
        </div>

        {/* Genre */}
        <div className="space-y-1">
          <Label htmlFor="genre">Genre</Label>
          <Select
            onValueChange={(value) => setValue("genre", value as IBook["genre"])}
            defaultValue={data?.data?.genre || ""}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Genre" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="FICTION">Fiction</SelectItem>
              <SelectItem value="NON_FICTION">Non-fiction</SelectItem>
              <SelectItem value="SCIENCE">Science</SelectItem>
              <SelectItem value="HISTORY">History</SelectItem>
              <SelectItem value="BIOGRAPHY">Biography</SelectItem>
              <SelectItem value="FANTASY">Fantasy</SelectItem>
            </SelectContent>
          </Select>
          {errors.genre && (
            <p className="text-sm text-destructive">Genre is required</p>
          )}
        </div>

        {/* ISBN */}
        <div className="space-y-1">
          <Label htmlFor="isbn">ISBN</Label>
          <Input id="isbn" {...register("isbn", { required: true })} />
          {errors.isbn && (
            <p className="text-sm text-destructive">ISBN is required</p>
          )}
        </div>

        {/* Description */}
        <div className="space-y-1">
          <Label htmlFor="description">Description</Label>
          <Input id="description" {...register("description")} />
        </div>

        {/* Copies */}
        <div className="space-y-1">
          <Label htmlFor="copies">Copies</Label>
          <Input
            type="number"
            id="copies"
            {...register("copies", {
              valueAsNumber: true,
              required: true,
              min: {
                value: 0,
                message: "Copies cannot be negative",
              },
            })}
          />
          {errors.copies && (
            <p className="text-sm text-destructive">{errors.copies.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <Button type="submit" className="w-full">
            Update Book
          </Button>
        </div>
      </form>
    </div>
  );
}
