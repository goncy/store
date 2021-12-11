import {CartItem} from "./types";

export function getCartItemPrice(item: CartItem): number {
  const optionsPrice = item.options
    ? Object.values(item.options).reduce((price, option) => price + option?.[0]?.price, 0)
    : 0;

  return (optionsPrice + item.price) * item.quantity;
}

export function getCartPrice(cart: CartItem[]): number {
  return cart.reduce((total, item) => total + getCartItemPrice(item), 0);
}
