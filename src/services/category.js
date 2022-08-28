import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/v1/" }),
  endpoints: (builder) => ({
    getCategoryById: builder.query({
      query: (id) => `category/${id}`,
    }),
  }),
});

export const { useGetCategoryByIdQuery } = categoryApi;
