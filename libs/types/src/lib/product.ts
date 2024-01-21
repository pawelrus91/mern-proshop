import type { Types } from 'mongoose';
import type { Review } from './review';

export type Product = {
  _id: string;
  name: string;
  image: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  countInStock: number;
  rating: number;
  numReviews: number;
};

export type ProductSchema = Product & {
  user: Types.ObjectId;
  reviews: Review[];
};
