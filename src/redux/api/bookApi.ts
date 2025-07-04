// src/redux/api/bookApi.ts
import type { IApiResponse } from "../../interfaces/apiResponse";
import type { IBook } from "../../types";
import { baseApi } from "./baseApi";

export const bookApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET all books
    getBooks: builder.query<IApiResponse<IBook[]>, { page: number; limit: number }>({
      query: ({ page, limit }) => `/api/books?page=${page}&limit=${limit}`,


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
