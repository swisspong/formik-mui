import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/v1/" }),
  tagTypes: ["Category", "Inventory", "Product", "OptionGroup", "Option","Order"],
  endpoints: (builder) => ({}),
});
