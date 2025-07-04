import { useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";

import type { IBook } from "../types";
import type { IApiResponse, IBooksResponse } from "../interfaces/apiResponse";
import {
  useDeleteBookMutation,
  useGetBooksQuery,
} from "../redux/api/bookApi";
import DeleteConfirmationDialog from "../components/shared/DeleteConfirmationDialog";
import Banner from "../components/shared/Banner";

export default function HomePage() {
  const [page, setPage] = useState(1);
  const limit = 8;

  const { data, isLoading, isError } = useGetBooksQuery({ page, limit });
  const [deleteBook] = useDeleteBookMutation();

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const apiResponse = data as IApiResponse<IBooksResponse> | undefined;
  const books: IBook[] = apiResponse?.data?.books ?? [];
  const meta = apiResponse?.data?.meta;
  const totalPages = meta ? Math.ceil(meta.total / meta.limit) : 1;

  const handleDelete = async () => {
    if (!selectedId) return;
    try {
      await deleteBook(selectedId).unwrap();
      toast.success("Book deleted successfully");
    } catch (err) {
      toast.error(`Failed to delete book: ${(err as Error).message}`);
    } finally {
      setDialogOpen(false);
      setSelectedId(null);
    }
  };

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePageClick = (pageNum: number) => {
    setPage(pageNum);
  };

  if (isLoading)
    return <p className="text-center mt-10 text-muted-foreground">Loading...</p>;

  if (isError)
    return (
      <p className="text-center text-red-500 mt-10">Failed to load books</p>
    );

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <Banner/>
      <h1 className="text-2xl font-bold mb-6 text-center text-foreground">
        All Books
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {books.map((book) => (
          <div
            key={book._id}
            className="border border-border rounded-xl p-4 shadow-sm hover:shadow-md transition bg-card text-foreground"
          >
            <Link to={`/book/${book._id}`} className="block space-y-2">
              <h2 className="text-lg font-semibold">{book.title}</h2>
              <p className="text-muted-foreground">
                <strong className="text-foreground">Author:</strong> {book.author}
              </p>
              <p className="text-muted-foreground">
                <strong className="text-foreground">Genre:</strong> {book.genre}
              </p>
              <p className="text-muted-foreground">
                <strong className="text-foreground">ISBN:</strong> {book.isbn}
              </p>
              <p className="text-muted-foreground">
                <strong className="text-foreground">Copies:</strong> {book.copies}
              </p>
              <p className="text-muted-foreground">
                <strong className="text-foreground">Available:</strong>{" "}
                <span className={book.available ? "text-green-500" : "text-red-500"}>
                  {book.available ? "Yes" : "No"}
                </span>
              </p>
            </Link>

            <div className="flex justify-between items-center mt-4">
              <Link to={`/edit-book/${book._id}`} className="text-blue-600 hover:underline">
                <Pencil size={16} />
              </Link>
              <button
                type="button"
                title="Delete book"
                onClick={() => {
                  setSelectedId(book._id!);
                  setDialogOpen(true);
                }}
                className="text-red-500 hover:underline"
              >
                <Trash2 size={16} />
              </button>
              <Link
                to={`/borrow/${book._id}`}
                className="text-green-600 font-medium hover:underline"
              >
                Borrow
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          <button
            onClick={handlePrev}
            disabled={page === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Previous
          </button>

          {[...Array(totalPages)].map((_, idx) => {
            const pageNum = idx + 1;
            return (
              <button
                key={pageNum}
                onClick={() => handlePageClick(pageNum)}
                className={`px-3 py-1 border rounded ${
                  page === pageNum ? "bg-primary text-white" : ""
                }`}
              >
                {pageNum}
              </button>
            );
          })}

          <button
            onClick={handleNext}
            disabled={page === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      <DeleteConfirmationDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
