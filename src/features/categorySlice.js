import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../services/api/apiSlice";

const categoryAdapter = createEntityAdapter({});

const initialState = categoryAdapter.getInitialState();

export const extendApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: ({ page = 1, per_page = 10 }) =>
        `category?page=${page}&per_page=${per_page}`,
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      transformResponse: (responseData) => {
        const format2 = responseData;
        format2.data = format2.data.map((category) => {
          return {
            ...category,
            breadcrumbs: category.breadcrumbs
              .map((item) => item.name)
              .join(" => ")
              ? category.breadcrumbs.map((item) => item.name).join(" => ")
              : "ไม่ระบุ  ",
          };
        });
        return format2;
      },
      providesTags: (result, error, arg) => {
        console.log(result);
        if (result?.data) {
          return [
            { type: "Category", id: "LIST" },
            ...result.data.map(({ id }) => ({ type: "Category", id })),
          ];
        } else return [{ type: "Category", id: "LIST" }];
      },
    }),
    getCategoryById: builder.query({
      query: (id) => `category/${id}`,
      transformResponse: (responseData) => {
        const format = responseData;
        format.breadcrumbs = format.breadcrumbs
          .map((item) => item.name)
          .join(" => ")
          ? format.breadcrumbs.map((item) => item.name).join(" => ")
          : "ไม่ระบุ  ";
        return format;
      },
      providesTags: (result, error, id) => [{ type: "Category", id }],
    }),
    createCategory: builder.mutation({
      query: (initialCategory) => ({
        url: "category",
        method: "POST",
        body: {
          ...initialCategory,
        },
      }),
      invalidatesTags: [{ type: "Category", id: "LIST" }],
    }),
    updateCategory: builder.mutation({
      query: ({ id, initialCategory }) => ({
        url: `category/${id}`,
        method: "PUT",
        body: {
          ...initialCategory,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Category", id: arg.id },
      ],
    }),
    deleteCategory: builder.mutation({
      query: ({ id }) => ({
        url: `category?id=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Category", id: arg.id },
      ],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = extendApiSlice;

export const selectCategoriesResult =
  extendApiSlice.endpoints.getCategories.select();

const selectCategoriesData = createSelector(
  selectCategoriesResult,
  (categoriesResult) => categoriesResult.data
);

export const {
  selectAll: selectAllCategories,
  selectById: selectCategoryById,
  selectIds: selectCategoryIds,
} = categoryAdapter.getSelectors(
  (state) => selectCategoriesData(state) ?? initialState
);
