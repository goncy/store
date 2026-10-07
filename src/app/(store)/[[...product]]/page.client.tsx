"use client";

import type {Product} from "~/product/types";

import {useRouter} from "next/navigation";

import {useCart} from "~/cart/context/client";
import CartItemDrawer from "~/cart/components/CartItemDrawer";

export default function PageClient({product}: {product: Product}) {
  const router = useRouter();
  const [, {addItem}] = useCart();

  return (
    <CartItemDrawer
      open
      item={{...product, quantity: 1}}
      onClose={() => router.push("/", {scroll: false})}
      onSubmit={(item) => {
        addItem(Date.now(), item);
        router.push("/", {scroll: false});
      }}
    />
  );
}
