import { baseApi } from "./baseApi";
import type {
  IBorrowPayload,
  IBorrowResponse,
  IBorrowSummary,
} from "../../types";

const borrowApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createBorrow: build.mutation<IBorrowResponse, IBorrowPayload>({
      query: (borrowData) => ({
        url: "/api/borrow",
        method: "POST",
        body: borrowData,
      }),
      invalidatesTags: ["Book", "Borrow"],
    }),

    getBorrowSummary: build.query<{ data: IBorrowSummary[] }, void>({
      query: () => "/api/borrow",
      providesTags: ["Borrow"],
    }),
  }),
});

export const { useCreateBorrowMutation, useGetBorrowSummaryQuery } = borrowApi;
