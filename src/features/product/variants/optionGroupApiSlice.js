import { apiSlice } from "../../../services/api/apiSlice";

export const extendApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOptionGroupByProductId: builder.query({
      query: ({ productId }) => `product/${productId}/variants`,
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      transformResponse: (responseData) => {
        return responseData;
      },
      providesTags: (result, error, arg) => [
        { type: "OptionGroup", id: arg.productId },
      ],
    }),
    updateOptionGroupListByPrdouctId: builder.mutation({
      query: ({ productId, body }) => ({
        url: `product/${productId}/variants`,
        method: "PUT",
        body: {
          ...body,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "OptionGroup", id: arg.productId },
      ],
    }),
  }),
});

export const {
  useGetOptionGroupByProductIdQuery,
  useUpdateOptionGroupListByPrdouctIdMutation,
} = extendApiSlice;
