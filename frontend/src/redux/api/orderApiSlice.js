import { apiSlice } from "./apiSlice";
import { PAYPAL_URL, ORDER_URL } from "../features/constants";

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: ORDER_URL,
        method: "POST",
        body: order,
      }),
    }),
    getOrderDetails: builder.query({
      query: (id) => ({
        url: `${ORDER_URL}/${id}`,
        method: "GET",
      }),
    }),
    payOrder: builder.mutation({
      query: ({ orderId, details }) => ({
        url: `${ORDER_URL}/${orderId}/pay`,
        method: "PUT",
        body: details,
      }),
    }),
    getPaypalClientId: builder.query({
      query: () => ({
        url: PAYPAL_URL,
      }),
    }),
    getMyOrders: builder.query({
      query: () => ({
        url: `${ORDER_URL}/mine`,
      }),
      keepUnusedDataFor: 5,
    }),
    getOrders: builder.query({
      query: () => ({
        url: ORDER_URL,
      }),
    }),
    deliverOrder: builder.mutation({
      query: (orderId) => ({
        url: `${ORDER_URL}/${orderId}/deliver`,
        method: "PUT",
      }),
    }),
    getTotalOrders: builder.query({
      query: () => `${ORDER_URL}/total-orders`,
    }),

    getTotalSales: builder.query({
      query: () => `${ORDER_URL}/total-sales`,
    }),
  }),
});
export const {
  useGetTotalOrdersQuery,
  useGetTotalSalesQuery,
  // useGetTotalSalesByDateQuery,
  // ------------------
  useCreateOrderMutation,
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPaypalClientIdQuery,
  useGetMyOrdersQuery,
  useDeliverOrderMutation,
  useGetOrdersQuery,
} = orderApiSlice;
