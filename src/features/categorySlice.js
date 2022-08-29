import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../services/api/apiSlice";

const categoryAdapter = createEntityAdapter({});

const initialState = categoryAdapter.getInitialState();

export const extendApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => "category",
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      transformResponse: (responseData) => {
        const format = responseData.map((category) => {
          return {
            ...category,
            breadcrumbs: category.breadcrumbs
              .map((item) => item.name)
              .join(" => ")
              ? category.breadcrumbs.map((item) => item.name).join(" => ")
              : "ไม่ระบุ  ",
          };
        });
        return categoryAdapter.setAll(initialState, format);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Category", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Category", id })),
          ];
        } else return [{ type: "Category", id: "LIST" }];
      },
      // [
      //   { type: "Category", id: "LIST" },
      //   ...result?.ids.map((id) => ({ type: "Category", id })),
      // ],
    }),
    getCategoryById: builder.query({
      query: (id) => `category/${id}`,
      transformResponse: (responseData) => {
        const transform = responseData.map((data) => {
          if (data?.categories) {
          }
        });
        return categoryAdapter.setAll(initialState, responseData);
      },
      providesTags: (result, error, arg) => {
        return [
          ...result.ids.map((id) => ({
            type: "Category",
            id,
          })),
        ];
      },
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
      query: ({ categoryId, initialCategory }) => ({
        url: `category/${categoryId}`,
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
