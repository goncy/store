"use client";

import type {Field} from "~/cart/types";
import type {Store} from "~/store/types";

import type {Product} from "../types";

import {useState} from "react";

import {Button} from "~/ui/components/control/button";
import CartDrawer from "~/cart/components/CartDrawer";
import {useCart} from "~/cart/context";

import ProductCard from "../components/ProductCard";

function StoreScreen({
  fields,
  categories,
  store,
}: {
  fields: Field[];
  categories: [Product["category"], Product[]][];
  store: Store;
}) {
  const [{total, quantity}, {addItem}] = useCart();
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  return (
    <>
      <div className="flex flex-col gap-4 sm:gap-8">
        <div className="flex flex-col gap-4 sm:gap-12">
          {categories.length ? (
            categories.map(([category, products]) => (
              <div key={category} className="flex flex-col gap-4">
                <h2 className="text-2xl font-semibold">
                  {category} <span className="opacity-70">({category.length})</span>
                </h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {products.length ? (
                    products.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onAdd={(_product: Product) =>
                          addItem(Date.now(), {..._product, quantity: 1})
                        }
                      />
                    ))
                  ) : (
                    <div className="flex flex-col gap-4">
                      <h2 className="text-2xl font-semibold">No hay productos</h2>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-semibold">No hay productos</h2>
            </div>
          )}
        </div>
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
                    {quantity} item
                  </p>
                </div>
                <p className="leading-6">{total}</p>
              </div>
            </Button>
          </div>
        )}
      </div>
      <CartDrawer
        fields={fields}
        isOpen={isCartOpen}
        store={store}
        onClose={() => setIsCartOpen(false)}
      />
    </>
  );
}

export default StoreScreen;
