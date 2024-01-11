import { apiSlice } from './apiSlices';

import { NewOrder, Order } from '@mern-proshop/types';
import { ORDERS_URL } from '../constants';

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
    // payOrder: builder.mutation({
    // query: (orderId: string, paymentResult) => ({
    //     url: `/api/orders/${orderId}/pay`,
    //     method: 'PUT',
    //     body: paymentResult,
    // }),
    // }),
    // deliverOrder: builder.mutation({
    //   query: (orderId) => ({
    //     url: `${ORDERS_URL}/${orderId}/deliver`,
    //     method: 'PUT',
    //   }),
    // }),
  }),
});

export const { useCreateOrderMutation } = ordersApiSlice;
