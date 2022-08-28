import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../services/api/apiSlice";

const categoryAdapter = createEntityAdapter({});

const initialState = categoryAdapter.getInitialState();

export const extendApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => "category",
      transformResponse: (responseData) => {
        return categoryAdapter.setAll(initialState, responseData);
      },
      providesTags: (result, error, arg) => [
        { type: "Category", id: "LIST" },
        ...result.ids.map((id) => ({ type: "Category", id })),
      ],
    }),
    getCategoryById: builder.query({
      query: (id) => `category/${id}`,
      transformResponse: (responseData) => {
        const transform = responseData.map(data=> {
             if(data?.categories){
                
             }
        })
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
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
  useCreateCategoryMutation,
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
