import { apiSlice } from "../../services/api/apiSlice";

export const extendApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getInventories: builder.query({
      query: (page = 1, per_page = 10 ) =>
        `inventory?page=${page}&per_page=${per_page}`,
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
            { type: "Inventory", id: "LIST" },
            ...result.data.map(({ id }) => ({ type: "Inventory", id })),
          ];
        } else return [{ type: "Inventory", id: "LIST" }];
      },
    }),
    getInventoryById: builder.query({
      query: (id) => `inventory/${id}`,
      transformResponse: (responseData) => {
        return responseData;
      },
      providesTags: (result, error, id) => [{ type: "Inventory", id }],
    }),
    createInventory: builder.mutation({
      query: (initialInventory) => ({
        url: "inventory",
        method: "POST",
        body: {
          ...initialInventory,
        },
      }),
      invalidatesTags: [{ type: "Inventory", id: "LIST" }],
    }),
    updateInventory: builder.mutation({
      query: ({ id, initialInventory }) => ({
        url: `inventory/${id}`,
        method: "PUT",
        body: {
          ...initialInventory,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Inventory", id: arg.id },
      ],
    }),
    deleteInventory: builder.mutation({
      query: ({ id }) => ({
        url: `inventory?id=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Inventory", id: arg.id },
      ],
    }),
  }),
});
export const {
  useGetInventoriesQuery,
  useGetInventoryByIdQuery,
  useCreateInventoryMutation,
  useDeleteInventoryMutation,
  useUpdateInventoryMutation,
} = extendApiSlice;

export const selectInventoryResult =
  extendApiSlice.endpoints.getInventories.select();

//   const selectCategoriesData = createSelector(
//     selectCategoriesResult,
//     (categoriesResult) => categoriesResult.data
//   );
