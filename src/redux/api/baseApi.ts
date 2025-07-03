import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://library-management-api-with-express.vercel.app',
  }),
  tagTypes: ['Book', 'Borrow'],
  endpoints: () => ({}),
});
