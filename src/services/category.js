import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/v1/" }),
  tagTypes: ["Categories"],
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => "category",
      providesTags: ["Categories"],
    }),
    getCategoryById: builder.query({
      query: (id) => `category/${id}`,
      providesTags: ["Categories"],
    }),
    createCategory: builder.mutation({
      query: (category) => ({
        url: `category`,
        method: "POST",
        body: category,
      }),
      invalidatesTags: ["Categories"],
    }),
    updateCategory: builder.mutation({
      query: (category) => ({
        url: `category/${category.id}`,
        method: "PUT",
        body: category,
      }),
    }),
    deleteCategory: builder.mutation({
      query: ({ id }) => ({
        url: `category/${id}`,
        method: "DELETE",
        body: id,
      }),
    }),
  }),
});

export const {
  useGetCategoryByIdQuery,
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
