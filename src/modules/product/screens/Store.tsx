"use client";

import type {Field} from "~/cart/types";

import type {Product} from "../types";

import {useState} from "react";

import {Button} from "~/ui/components/control/button";
import CartDrawer from "~/cart/components/CartDrawer";
import {useCart} from "~/cart/context";

import ProductCard from "../components/ProductCard";

function StoreScreen({products, fields}: {products: Product[]; fields: Field[]}) {
  const [{total, quantity}, {addItem}] = useCart();
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  return (
    <>
      <div className="flex flex-col gap-4">
        {products.length ? (
          <div className="sm:grid-cols-[repeat(auto-fill,_minmax(360px,_1fr))]))] grid grid-cols-[repeat(auto-fill,_minmax(320px,_1fr))] gap-4">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAdd={(_product: Product) => addItem(Date.now(), {..._product, quantity: 1})}
              />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground m-auto text-lg">No hay productos</p>
        )}
        {Boolean(quantity) && (
          <div className="sticky bottom-4 flex content-center items-center sm:m-auto">
            <Button
              className="w-full shadow-lg sm:w-fit"
              data-testid="show-cart"
              size="lg"
              variant="brand"
              onClick={() => setIsCartOpen(true)}
            >
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-3">
                  <p className="leading-6">Ver pedido</p>
                  <p className="rounded-sm bg-black/25 px-2 py-1 text-xs font-semibold text-white/90">
                    {quantity} items
                  </p>
                </div>
                <p className="leading-6">{total}</p>
              </div>
            </Button>
          </div>
        )}
      </div>
      <CartDrawer fields={fields} isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}

export default StoreScreen;
