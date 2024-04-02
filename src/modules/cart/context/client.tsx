"use client";

import type {Store} from "~/store/types";

import type {Cart, CartItem, Checkout, Field} from "../types";

import {useState, useMemo, useCallback, useContext, createContext} from "react";

import {parseCurrency} from "~/currency/utils";

import {Button} from "@/components/ui/button";

import CartDrawer from "../components/CartDrawer";
import {getCartMessage, getCartTotal} from "../utils";

interface Context {
  state: {
    cart: Cart;
    checkout: Checkout;
    total: string;
    quantity: number;
    message: string;
  };
  actions: {
    addItem: (id: number, value: CartItem) => void;
    removeItem: (id: number) => void;
    updateItem: (id: number, value: CartItem) => void;
    updateField: (id: string, value: string) => void;
  };
}

const CartContext = createContext({} as Context);

function CartProviderClient({
  fields,
  children,
  store,
}: {
  fields: Field[];
  children: React.ReactNode;
  store: Store;
}) {
  const [checkout, setCheckout] = useState<Checkout>(() => new Map());
  const [cart, setCart] = useState<Cart>(() => new Map());
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const total = useMemo(() => parseCurrency(getCartTotal(cart)), [cart]);
  const quantity = useMemo(
    () => Array.from(cart.values()).reduce((acc, item) => acc + item.quantity, 0),
    [cart],
  );
  const message = useMemo(() => getCartMessage(cart, checkout), [cart, checkout]);

  const addItem = useCallback(
    (id: number, value: CartItem) => {
      cart.set(id, value);

      setCart(new Map(cart));
    },
    [cart],
  );

  const removeItem = useCallback(
    (id: number) => {
      cart.delete(id);

      setCart(new Map(cart));
    },
    [cart],
  );

  const updateItem = useCallback(
    (id: number, value: CartItem) => {
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

  return (
    <CartContext.Provider value={{state, actions}}>
      <>
        {children}
        {/* Cart button */}
        {Boolean(quantity) && (
          <div className="sticky bottom-0 flex content-center items-center pb-4 sm:m-auto">
            <Button
              aria-label="Ver pedido"
              className="m-auto w-full px-4 shadow-lg sm:w-fit"
              data-testid="show-cart"
              size="lg"
              variant="brand"
              onClick={() => {
                setIsCartOpen(true);
              }}
            >
              <div className="flex w-full items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <p className="leading-6">Ver pedido</p>
                  <p className="rounded-sm bg-black/25 px-2 py-1 text-xs font-semibold text-white/90">
                    {quantity} item
                  </p>
                </div>
                <p className="leading-6">{total}</p>
              </div>
            </Button>
          </div>
        )}
        {/* Cart Drawer */}
        {Boolean(isCartOpen) && (
          <CartDrawer
            fields={fields}
            store={store}
            onClose={() => {
              setIsCartOpen(false);
            }}
          />
        )}
      </>
    </CartContext.Provider>
  );
}

export function useCart(): [Context["state"], Context["actions"]] {
  const {state, actions} = useContext(CartContext);

  return [state, actions];
}

export default CartProviderClient;
