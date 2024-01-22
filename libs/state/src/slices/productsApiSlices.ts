import { PRODUCTS_URL } from '../constants';
import { apiSlice } from './apiSlices';

import type { Product, Review, ProductSchema } from '@mern-proshop/types';

type UploadImageResponse = { message: string; image: string };

type CreateReview = Pick<Review, 'comment' | 'rating'> & { productId: string };

export type GetProductResponse = {
  products: Product[];
  page: number;
  pages: number;
};

export type GetProductRequest = {
  pageNumber?: string;
  keyword?: string;
};

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<GetProductResponse, GetProductRequest>({
      query: ({ pageNumber, keyword } = {}) => ({
        url: PRODUCTS_URL,
        params: {
          keyword,
          pageNumber,
        },
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Products'],
    }),
    getProductDetails: builder.query<ProductSchema, { id: string }>({
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
    updateProduct: builder.mutation<Product, Partial<Product>>({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data._id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Products'],
    }),
    uploadProductImage: builder.mutation<UploadImageResponse, FormData>({
      query: (data) => ({
        url: `/api/upload`,
        method: 'POST',
        body: data,
      }),
    }),
    deleteProduct: builder.mutation<void, Product['_id']>({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Products'],
    }),
    createReview: builder.mutation<void, CreateReview>({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data.productId}/reviews`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Products'],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useUploadProductImageMutation,
  useDeleteProductMutation,
  useCreateReviewMutation,
} = productsApiSlice;
