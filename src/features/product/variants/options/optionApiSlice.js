import { apiSlice } from "../../../../services/api/apiSlice";

export const extendApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOptionListByProductIdAndOptionGroupId: builder.query({
      query: ({ productId, optionGroupId }) =>
        `product/${productId}/variants/${optionGroupId}/options`,
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      transformResponse: (responseData) => {
        return responseData;
      },
      providesTags: (result, error, arg) => [
        { type: "Option", id: arg.optionGroupId },
      ],
    }),
    updateOptoinListByProductIdAndOptionGroupId: builder.mutation({
      query: ({ productId, optionGroupId, initialOptions }) => ({
        url: `product/${productId}/variants/${optionGroupId}/options`,
        method: "PUT",
        body: {
          ...initialOptions,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Option", id: arg.optionGroupId },
      ],
    }),
  }),
});

export const {
  useGetOptionListByProductIdAndOptionGroupIdQuery,
  useUpdateOptoinListByProductIdAndOptionGroupIdMutation,
} = extendApiSlice;
