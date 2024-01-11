import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { updateCard } from '../utils/cartUtils';

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

const initialState: CartState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart') as string)
  : { cartItems: [], shippingAddress: {}, paymentMethod: 'PayPal' };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const item = action.payload;

      const existItem = state.cartItems?.find(
        (x: CartItem) => x.product._id === item.product._id
      );

      if (existItem) {
        state.cartItems = state.cartItems.map((cartItem: CartItem) =>
          cartItem.product._id === existItem.product._id ? item : cartItem
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));

      return updateCard(state);
    },
    removeFromCart: (state, action: PayloadAction<Product['_id']>) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.product._id !== action.payload
      );

      return updateCard(state);
    },
    saveShippingAddress: (state, action: PayloadAction<ShippingAddress>) => {
      state.shippingAddress = action.payload;

      return updateCard(state);
    },
    savePaymentMethod: (state, action: PayloadAction<PaymentMethod>) => {
      state.paymentMethod = action.payload;

      return updateCard(state);
    },
    clearCartItems: (state) => {
      state.cartItems = [];

      return updateCard(state);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  saveShippingAddress,
  savePaymentMethod,
  clearCartItems,
} = cartSlice.actions;

export const cartSliceReducer = cartSlice.reducer;
