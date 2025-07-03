import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { useUpdateBookMutation } from "../../redux/api/bookApi";
import { useEffect } from "react";
import { toast } from "react-toastify";
import type { IBook } from "../../types";


interface EditBookModalProps {
  book: IBook;
  open: boolean;
  onClose: () => void;
}

export function EditBookModal({ book, open, onClose }: EditBookModalProps) {
  const { register, handleSubmit, reset } = useForm<IBook>();
  const [updateBook, { isLoading }] = useUpdateBookMutation();

  // Reset form when book or modal opens
  useEffect(() => {
    if (book) {
      reset(book);
    }
  }, [book, reset]);

  const onSubmit = async (data: IBook) => {
    try {
      await updateBook({ id: book._id!, data }).unwrap();
      toast.success("Book updated successfully!");
      onClose();
    } catch (error) {
      toast.error(`Failed to update book: ${(error as Error).message}`);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Book</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <Input {...register("title", { required: true })} placeholder="Title" />
          <Input {...register("author", { required: true })} placeholder="Author" />
          <Input {...register("genre", { required: true })} placeholder="Genre" />
          <Input {...register("isbn", { required: true })} placeholder="ISBN" />
          <Input
            type="number"
            {...register("copies", { required: true, min: 0 })}
            placeholder="Copies"
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Updating..." : "Update Book"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
