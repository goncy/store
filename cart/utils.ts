import {parseCurrency} from "../utils/currency";

import {CartItem} from "./types";

export function getCartItemPrice(item: CartItem): number {
  const optionsPrice = item.options
    ? Object.values(item.options).reduce((price, option) => price + option?.[0]?.price, 0)
    : 0;

  return (optionsPrice + item.price) * item.quantity;
}

export function getCartTotal(cart: CartItem[]): number {
  return cart.reduce((total, item) => total + getCartItemPrice(item), 0);
}

export function getCartItemOptionsSummary(options: CartItem["options"]): string {
  return Object.entries(options)
    .reduce((options, [category, option]) => options.concat(`${category}: ${option[0].title}`), [])
    .join(", ");
}

export function getCartMessage(cart: CartItem[]): string {
  return cart
    .reduce(
      (message, item) =>
        message.concat(
          `* ${item.title}${item.quantity > 1 ? ` (X${item.quantity})` : ``}${
            item.options ? ` [${getCartItemOptionsSummary(item.options)}]` : ``
          } - ${parseCurrency(getCartItemPrice(item))}\n`,
        ),
      ``,
    )
    .concat(`\nTotal: ${parseCurrency(getCartTotal(cart))}`);
}
