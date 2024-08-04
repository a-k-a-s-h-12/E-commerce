import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../features/constants";
export const apiSlice = createApi({
  // reducerPath : its a unique Id -- > it should be String type
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["Product", "Order", "User", "Category"],
  endpoints: () => ({}),
});
