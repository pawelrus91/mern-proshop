import type { Types } from 'mongoose';

//
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

export type PaymentMethod = 'Stripe' | 'PayPal';

export type Order = {
  _id: string;
  user: Types.ObjectId;
  orderItems: OrderItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: PaymentMethod;
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

export type NewOrder = Omit<
  Order,
  'isPaid' | 'paidAt' | 'isDelivered' | 'deliveredAt'
>;
