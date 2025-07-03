// src/pages/BookDetailsPage.tsx
import { useParams } from "react-router-dom";
import { LoaderCircle } from "lucide-react";
import { useGetSingleBookQuery } from "../redux/api/bookApi";

export default function BookDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useGetSingleBookQuery(id!, {
    skip: !id,
  });

  const book = data?.data; // ✅ extract book object

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoaderCircle className="animate-spin h-8 w-8" />
      </div>
    );
  }

  if (isError || !book) {
    return (
      <div className="text-center mt-10 text-red-500">
        Error fetching book details.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-4">
      <h1 className="text-3xl font-bold">{book.title}</h1>
      <p>
        <strong>Author:</strong> {book.author}
      </p>
      <p>
        <strong>Genre:</strong> {book.genre}
      </p>
      <p>
        <strong>ISBN:</strong> {book.isbn}
      </p>
      <p>
        <strong>Description:</strong> {book.description}
      </p>
      {book.createdAt && (
        <p>
          <strong>Publication Date:</strong>{" "}
          {new Date(book.createdAt).toLocaleDateString()}
        </p>
      )}
      <p>
        <strong>Copies Available:</strong> {book.copies}
      </p>
      <p>
        <strong>Status:</strong>{" "}
        {book.available ? "✅ Available" : "❌ Not Available"}
      </p>
    </div>
  );
}
