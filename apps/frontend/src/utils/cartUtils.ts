import { CartItem, CartState } from '../slices/cartSlice';

export const addDecimals = (num: number) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCard = (state: CartState) => {
  // Calculate items prices
  state.itemsPrice = addDecimals(
    state.cartItems.reduce(
      (acc: number, item: CartItem) => acc + item.qty * item.product.price,
      0
    )
  );
  // Calculate shipping price (If order is over $100 then free, else $10 shipping)
  state.shippingPrice = addDecimals(Number(state.itemsPrice) > 100 ? 0 : 10);

  // Calculate tax price
  state.taxPrice = addDecimals(Number(state.itemsPrice) * 0.15);
  // Calculate total price
  state.totalPrice = addDecimals(
    Number(state.itemsPrice) +
      Number(state.shippingPrice) +
      Number(state.taxPrice)
  );

  localStorage.setItem('cart', JSON.stringify(state));

  return state;
};
