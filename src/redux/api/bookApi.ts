// src/redux/api/bookApi.ts
import type {
  IApiResponse,
  IBooksResponse,
} from "../../interfaces/apiResponse";
import type { IBook } from "../../types";
import { baseApi } from "./baseApi";

export const bookApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET all books
    getBooks: builder.query<
      IApiResponse<IBooksResponse>,
      { page: number; limit: number; search?: string }
    >({
      query: ({ page, limit, search }) => {
        const queryParams = new URLSearchParams();
        queryParams.set("page", String(page));
        queryParams.set("limit", String(limit));
        if (search) queryParams.set("filter", search);

        return `/api/books?${queryParams.toString()}`;
      },
      providesTags: ["Book"],
    }),

    // Get Single book by ID
    getSingleBook: builder.query<IApiResponse<IBook>, string>({
      query: (id) => `/api/books/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Book", id }],
    }),

    // ADD new book
    createBook: builder.mutation<IBook, Partial<IBook>>({
      query: (bookData) => ({
        url: "/api/books",
        method: "POST",
        body: bookData,
      }),
      invalidatesTags: ["Book"], // Invalidate cached "Book" data to trigger refetch
    }),

    // UPDATE book
    updateBook: builder.mutation<IBook, { id: string; data: Partial<IBook> }>({
      query: ({ id, data }) => ({
        url: `/api/books/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Book"], // Invalidate cache so `getBooks` refetches
    }),

    // DELETE book
    deleteBook: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/api/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Book"],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetSingleBookQuery,
  useCreateBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = bookApi;
