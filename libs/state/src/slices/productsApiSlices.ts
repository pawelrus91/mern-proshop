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
    getProductDetails: builder.query<Product, { id: string }>({
      query: ({ id }) => ({
        url: `${PRODUCTS_URL}/${id}`,
        keepUnusedDataFor: 5,
      }),
    }),
    createProduct: builder.mutation<Product[], void>({
      query: () => ({
        url: PRODUCTS_URL,
        method: 'POST',
        // body,
      }),
      invalidatesTags: ['Products'],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useCreateProductMutation,
} = productsApiSlice;
