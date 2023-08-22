"use client";

import type {Product} from "~/product/types";

import {useRouter} from "next/navigation";

import ProductCard from "~/product/components/ProductCard";
import {useCart} from "~/cart/context/client";

export default function ProductPageClient({product}: {product: Product}) {
  const [, {addItem}] = useCart();
  const router = useRouter();

  function handleAddToCart(product: Product) {
    addItem(Date.now(), {...product, quantity: 1});
    router.push("/");
  }

  return <ProductCard key={product.id} product={product} onAdd={handleAddToCart} />;
}
