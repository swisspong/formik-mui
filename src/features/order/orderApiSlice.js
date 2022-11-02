import { apiSlice } from "../../services/api/apiSlice";

export const extendApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: (page = 1, per_page = 10) =>
        `order?page=${page}&per_page=${per_page}`,
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
            { type: "Order", id: "LIST" },
            ...result.data.map(({ id }) => ({ type: "Order", id })),
          ];
        } else return [{ type: "Order", id: "LIST" }];
      },
    }),
    getOrderById: builder.query({
      query: (id) => `order/${id}`,
      transformResponse: (responseData) => {
        return responseData;
      },
      providesTags: (result, error, id) => [{ type: "Order", id }],
    }),
    createOrder: builder.mutation({
      query: (initialOrder) => ({
        url: "order",
        method: "POST",
        body: {
          ...initialOrder,
        },
      }),
      invalidatesTags: [{ type: "Order", id: "LIST" }],
    }),
    updateOrder: builder.mutation({
      query: ({ id, body }) => ({
        url: `order/${id}`,
        method: "PUT",
        body: {
          ...body,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Order", id: arg.id }],
    }),
    verifiedSlip: builder.mutation({
      query: ({ orderId, slipId, body }) => ({
        url: `order/${orderId}/slip/${slipId}/verified`,
        method: "PUT",
        body: {
          ...body,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Order", id: arg.id }],
    }),
    updateOrderStatus: builder.mutation({
      query: ({ orderId, body }) => ({
        url: `order/${orderId}/status`,
        method: "PUT",
        body: {
          ...body,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Order", id: arg.id }],
    }),

    deleteOrder: builder.mutation({
      query: ({ id }) => ({
        url: `order?id=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Order", id: arg.id }],
    }),
  }),
});
export const {
  useCreateOrderMutation,
  useDeleteOrderMutation,
  useGetOrderByIdQuery,
  useGetOrdersQuery,
  useVerifiedSlipMutation,
  useUpdateOrderMutation,
  useUpdateOrderStatusMutation
} = extendApiSlice;

export const selectOrderResult = extendApiSlice.endpoints.getOrders.select();
