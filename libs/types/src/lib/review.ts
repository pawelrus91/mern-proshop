import type { Types } from 'mongoose';

export type Review = {
  name: string;
  rating: number;
  comment: string;
  user: Types.ObjectId;
};
