import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { updateCard } from '../utils/cartUtils';

import { Product } from '@mern-proshop/types';

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
};

const initialState: CartState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart') as string)
  : { cartItems: [] };

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
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
