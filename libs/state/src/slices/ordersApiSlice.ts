import { apiSlice } from './apiSlices';

import { NewOrder, Order, Modify, User } from '@mern-proshop/types';
import { ORDERS_URL, PAYPAL_URL } from '../constants';

type CreateOrderResponse = Order & { _id: string };

const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation<CreateOrderResponse, NewOrder>({
      query: (order) => ({
        url: ORDERS_URL,
        method: 'POST',
        body: order,
      }),
    }),
    getOrderDetails: builder.query<Modify<Order, { user: User }>, string>({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    payOrder: builder.mutation({
      query: ({ orderId, details }) => ({
        url: `${ORDERS_URL}/${orderId}/pay`,
        method: 'PUT',
        body: details,
      }),
    }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getPaypalClientId: builder.query<any, void>({
      query: () => ({
        url: PAYPAL_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    // getOrders: builder.query({
    //   query: () => ({
    //     url: ORDERS_URL,
    //   }),
    // }),
    // getOrder: builder.query({
    //   query: (orderId) => ({
    //     url: `${ORDERS_URL}/${orderId}`,
    //   }),
    // }),

    // deliverOrder: builder.mutation({
    //   query: (orderId) => ({
    //     url: `${ORDERS_URL}/${orderId}/deliver`,
    //     method: 'PUT',
    //   }),
    // }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPaypalClientIdQuery,
} = ordersApiSlice;
