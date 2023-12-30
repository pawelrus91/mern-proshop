import { PRODUCTS_URL } from '../constants';
import { apiSlice } from './apiSlices';

import { Product } from '@mern-proshop/types';

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => ({
        url: PRODUCTS_URL,
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Products'],
    }),
  }),
});

export const { useGetProductsQuery } = productsApiSlice;
