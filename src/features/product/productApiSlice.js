import { apiSlice } from "../../services/api/apiSlice";

export const extendApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (page = 1, per_page = 10) =>
        `product?page=${page}&per_page=${per_page}`,
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      transformResponse: (responseData) => {
        return responseData;
      },
      providesTags: (result, error, arg) => {
        console.log(result);
        if (result?.data) {
          return [
            { type: "Product", id: "LIST" },
            ...result.data.map(({ id }) => ({ type: "Product", id })),
          ];
        } else return [{ type: "Product", id: "LIST" }];
      },
    }),
    getProductById: builder.query({
      query: (id) => `product/${id}`,
      transformResponse: (responseData) => {
        return responseData;
      },
      providesTags: (result, error, id) => [{ type: "Product", id }],
    }),
    createProduct: builder.mutation({
      query: (initialInventory) => ({
        url: "product",
        method: "POST",
        body: {
          ...initialInventory,
        },
      }),
      invalidatesTags: [{ type: "Product", id: "LIST" }],
    }),
    updateProduct: builder.mutation({
      query: ({ id, initialInventory }) => ({
        url: `product/${id}`,
        method: "PUT",
        body: {
          ...initialInventory,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Product", id: arg.id },
      ],
    }),
    updateProductVariant: builder.mutation({
      query: ({ id, initialInventory }) => ({
        url: `product/${id}/variants`,
        method: "PUT",
        body: {
          ...initialInventory,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Product", id: arg.id },
      ],
    }),
    deleteProduct: builder.mutation({
      query: ({ id }) => ({
        url: `product?id=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Product", id: arg.id },
      ],
    }),
  }),
});
export const {
  useGetProductByIdQuery,
  useGetProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useUpdateProductVariantMutation,
} = extendApiSlice;

export const selectInventoryResult =
  extendApiSlice.endpoints.getInventories.select();

//   const selectCategoriesData = createSelector(
//     selectCategoriesResult,
//     (categoriesResult) => categoriesResult.data
//   );
