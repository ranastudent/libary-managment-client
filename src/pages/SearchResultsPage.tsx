import { useSearchParams, useNavigate } from "react-router-dom";
import { useGetBooksQuery } from "../redux/api/bookApi";
import type { IBook } from "../types";
import type { IApiResponse, IBooksResponse } from "../interfaces/apiResponse";
import { useState } from "react";

export default function SearchResultsPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const query = params.get("query") || "";
  const pageParam = Number(params.get("page")) || 1;
  const [page, setPage] = useState(pageParam);
  const limit = 10;

  const { data, isLoading, isError } = useGetBooksQuery({ page, limit, search: query });
  const apiResponse = data as IApiResponse<IBooksResponse> | undefined;
  const books: IBook[] = apiResponse?.data?.books ?? [];
  const meta = apiResponse?.data?.meta;

  const totalPages = meta ? Math.ceil(meta.total / meta.limit) : 1;

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    navigate(`/search?query=${encodeURIComponent(query)}&page=${newPage}`);
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">
        Search Results for: <span className="text-primary">"{query}"</span>
      </h1>

      {isLoading && <p>Loading...</p>}
      {isError && <p className="text-red-500">Failed to load results.</p>}
      {!isLoading && !isError && books.length === 0 && (
        <p className="text-muted-foreground">No books found.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {books.map((book) => (
          <div
            key={book._id}
            className="border border-border rounded-lg p-4 bg-card text-foreground shadow-sm"
          >
            <h2 className="text-lg font-semibold">{book.title}</h2>
            <p className="text-sm text-muted-foreground">
              <strong>Author:</strong> {book.author}
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>Genre:</strong> {book.genre}
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>ISBN:</strong> {book.isbn}
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>Available:</strong>{" "}
              <span className={book.available ? "text-green-600" : "text-red-500"}>
                {book.available ? "Yes" : "No"}
              </span>
            </p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {books.length > 0 && (
        <div className="flex justify-center mt-6 gap-2">
          <button
            onClick={() => handlePageChange(page - 1)}
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
                onClick={() => handlePageChange(pageNum)}
                className={`px-3 py-1 border rounded ${
                  page === pageNum ? "bg-red-50 text-red-700" : ""
                }`}
              >
                {pageNum}
              </button>
            );
          })}

          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
