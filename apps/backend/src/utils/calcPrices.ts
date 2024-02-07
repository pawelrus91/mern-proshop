import { Product, ShippingAddress, PaymentMethod } from '@mern-proshop/types';

export type CartItem = {
  product: Product;
  qty: number;
};

export type CartState = {
  cartItems: CartItem[];
  itemsPrice: string;
  shippingPrice: string;
  taxPrice: string;
  totalPrice: string;
  shippingAddress: ShippingAddress;
  paymentMethod: PaymentMethod;
};

const addDecimals = (num: number) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const calcPrices = (orderItems: CartItem[]) => {
  // Calculate the items price
  const itemsPrice = addDecimals(
    orderItems.reduce((acc, item) => acc + item.product.price * item.qty, 0)
  );
  // Calculate the shipping price
  const shippingPrice = addDecimals(Number(itemsPrice) > 100 ? 0 : 10);
  // Calculate the tax price
  const taxPrice = addDecimals(Number((0.15 * Number(itemsPrice)).toFixed(2)));
  // Calculate the total price
  const totalPrice = (
    Number(itemsPrice) +
    Number(shippingPrice) +
    Number(taxPrice)
  ).toFixed(2);
  return { itemsPrice, shippingPrice, taxPrice, totalPrice };
};
