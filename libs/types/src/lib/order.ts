import type { Types } from 'mongoose';

export type OrderItem = {
  name: string;
  qty: number;
  image: string;
  price: number;
  product: Types.ObjectId;
};

export type ShippingAddress = {
  address: string;
  city: string;
  postalCode: string;
  country: string;
};

export type PaymentResult = {
  id?: string;
  status?: string;
  update_time?: string;
  email_address?: string;
};

export type Order = {
  user: Types.ObjectId;
  orderItems: OrderItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  paymentResult: PaymentResult;
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  isPaid: boolean;
  paidAt?: Date;
  isDelivered: boolean;
  deliveredAt?: Date;
};
