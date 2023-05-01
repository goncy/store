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
          <div className="grid gap-4 grid-cols-[repeat(auto-fill,_minmax(320px,_1fr))] sm:grid-cols-[repeat(auto-fill,_minmax(360px,_1fr))]))]">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAdd={(_product: Product) => addItem(Date.now(), {..._product, quantity: 1})}
              />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-lg m-auto">No hay productos</p>
        )}
        {Boolean(quantity) && (
          <div className="flex items-center bottom-4 content-center sticky sm:m-auto">
            <Button
              className="shadow-lg w-full sm:w-fit"
              data-testid="show-cart"
              size="lg"
              variant="brand"
              onClick={() => setIsCartOpen(true)}
            >
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-3">
                  <p className="leading-6">Ver pedido</p>
                  <p className="bg-black/25 rounded-sm text-white/90 text-xs font-semibold px-2 py-1">
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
