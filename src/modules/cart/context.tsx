"use client";

import type {Cart, CartItem, Checkout, Field} from "./types";

import {useState, useMemo, useCallback, useContext, createContext} from "react";

import {parseCurrency} from "@/utils/currency";

import {getCartMessage, getCartTotal} from "./utils";

interface Context {
  state: {
    cart: Cart;
    checkout: Checkout;
    total: string;
    quantity: number;
    message: string;
  };
  actions: {
    addItem: (id: symbol, value: CartItem) => void;
    removeItem: (id: symbol) => void;
    updateItem: (id: symbol, value: CartItem) => void;
    updateField: (id: string, value: string) => void;
  };
}

const CartContext = createContext({} as Context);

function CartProvider(props: {fields: Field[]; children: React.ReactNode}) {
  const [checkout, setCheckout] = useState<Checkout>(() => new Map());
  const [cart, setCart] = useState<Cart>(() => new Map());
  const total = useMemo(() => parseCurrency(getCartTotal(cart)), [cart]);
  const quantity = useMemo(
    () => Array.from(cart.values()).reduce((acc, item) => acc + item.quantity, 0),
    [cart],
  );
  const message = useMemo(() => getCartMessage(cart, checkout), [cart, checkout]);

  const addItem = useCallback(
    (id: symbol, value: CartItem) => {
      cart.set(id, value);

      setCart(new Map(cart));
    },
    [cart],
  );

  const removeItem = useCallback(
    (id: symbol) => {
      cart.delete(id);

      setCart(new Map(cart));
    },
    [cart],
  );

  const updateItem = useCallback(
    (id: symbol, value: CartItem) => {
      cart.set(id, value);

      setCart(new Map(cart));
    },
    [cart],
  );

  const updateField = useCallback(
    (id: string, value: string) => {
      checkout.set(id, value);

      setCheckout(new Map(checkout));
    },
    [checkout],
  );

  const state = useMemo(
    () => ({checkout, cart, total, quantity, message}),
    [checkout, cart, total, quantity, message],
  );
  const actions = useMemo(
    () => ({updateItem, updateField, addItem, removeItem}),
    [updateItem, updateField, addItem, removeItem],
  );

  return <CartContext.Provider value={{state, actions}}>{props.children}</CartContext.Provider>;
}

export function useCart(): [Context["state"], Context["actions"]] {
  const {state, actions} = useContext(CartContext);

  return [state, actions];
}

export default CartProvider;
