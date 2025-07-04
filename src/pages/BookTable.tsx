import { useState } from "react";
import { useGetBooksQuery, useDeleteBookMutation } from "../redux/api/bookApi";
import type { IBook } from "../types";
import { toast } from "react-toastify";
import { Trash2, Pencil } from "lucide-react";
import { Link } from "react-router-dom";
import DeleteConfirmationDialog from "../components/shared/DeleteConfirmationDialog";
import type { IApiResponse, IBooksResponse } from "../interfaces/apiResponse";

export default function BookTable() {
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading, isError } = useGetBooksQuery({ page, limit });
  const [deleteBook] = useDeleteBookMutation();

  const apiResponse = data as IApiResponse<IBooksResponse> | undefined;
  const books: IBook[] = apiResponse?.data?.books ?? [];
  const meta = apiResponse?.data?.meta;

  const totalPages = meta ? Math.ceil(meta.total / meta.limit) : 1;

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

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
      <p className="text-center text-destructive mt-10">Failed to load books</p>
    );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6 text-center text-foreground">
        All Books
      </h1>

      {/* Mobile Cards */}
      <div className="block md:hidden space-y-4">
        {books.map((book) => (
          <div
            key={book._id}
            className="p-4 border border-border rounded-lg shadow-sm bg-background text-foreground space-y-2"
          >
            <p><strong>Title:</strong> {book.title}</p>
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>Genre:</strong> {book.genre}</p>
            <p><strong>ISBN:</strong> {book.isbn}</p>
            <p><strong>Copies:</strong> {book.copies}</p>
            <p><strong>Available:</strong> {book.available ? "Yes" : "No"}</p>

            <div className="flex gap-3 mt-2">
              <Link to={`/edit-book/${book._id}`} className="text-primary hover:underline">
                <Pencil size={16} />
              </Link>
              <button
                type="button"
                title="Delete book"
                onClick={() => {
                  setSelectedId(book._id!);
                  setDialogOpen(true);
                }}
                className="text-destructive"
              >
                <Trash2 size={16} />
              </button>
              <Link to={`/borrow/${book._id}`} className="text-green-600 hover:underline">
                Borrow
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full border border-border text-sm bg-background text-foreground">
          <thead className="bg-muted text-muted-foreground">
            <tr>
              <th className="p-3 border border-border text-left">Title</th>
              <th className="p-3 border border-border text-left">Author</th>
              <th className="p-3 border border-border text-left">Genre</th>
              <th className="p-3 border border-border text-left">ISBN</th>
              <th className="p-3 border border-border text-left">Copies</th>
              <th className="p-3 border border-border text-left">Available</th>
              <th className="p-3 border border-border text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book._id} className="hover:bg-muted transition-colors duration-200">
                <td className="p-3 border border-border">{book.title}</td>
                <td className="p-3 border border-border">{book.author}</td>
                <td className="p-3 border border-border">{book.genre}</td>
                <td className="p-3 border border-border">{book.isbn}</td>
                <td className="p-3 border border-border">{book.copies}</td>
                <td className="p-3 border border-border">
                  {book.available ? "Yes" : "No"}
                </td>
                <td className="p-3 border border-border text-center">
                  <div className="flex justify-center gap-3">
                    <Link to={`/edit-book/${book._id}`} className="text-primary hover:underline">
                      <Pencil size={16} />
                    </Link>
                    <button
                      type="button"
                      title="Delete book"
                      onClick={() => {
                        setSelectedId(book._id!);
                        setDialogOpen(true);
                      }}
                      className="text-destructive"
                    >
                      <Trash2 size={16} />
                    </button>
                    <Link
                      to={`/borrow/${book._id}`}
                      className="text-green-600 font-semibold hover:underline"
                    >
                      Borrow
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 gap-2">
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

      {/* Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
