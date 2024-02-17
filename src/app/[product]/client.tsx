"use client";

import type {Product} from "~/product/types";

import {useRouter} from "next/navigation";
import Link from "next/link";

import ProductCard from "~/product/components/ProductCard";
import {useCart} from "~/cart/context/client";

import {Button} from "@/components/ui/button";

export default function ProductPageClient({product}: {product: Product}) {
  const [, {addItem}] = useCart();
  const router = useRouter();

  function handleAddToCart(product: Product) {
    addItem(Date.now(), {...product, quantity: 1});
    router.push("/");
  }

  return (
    <div className="flex flex-col gap-4 py-4">
      <ProductCard key={product.id} product={product} onAdd={handleAddToCart} />
      <Link className="text-center" href="/">
        <Button variant="link">Volver al catálogo</Button>
      </Link>
    </div>
  );
}
