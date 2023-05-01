import type {CartItem} from "~/cart/types";

import type {Product} from "../types";

import React from "react";
import {Button} from "@chakra-ui/react";

import CartItemDrawer from "~/cart/components/CartItemDrawer";
import {parseCurrency} from "~/currency/utils";

function ProductCard({product, onAdd}: {product: Product; onAdd: (product: Product) => void}) {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const cartItem = React.useMemo<CartItem>(() => ({...product, quantity: 1}), [product]);

  return (
    <>
      <div
        key={product.id}
        className="flex items-center border-white/300 rounded-md border justify-between gap-3"
        data-testid="product"
      >
        <div className="flex gap-4 p-2 w-full">
          <img
            alt={product.title}
            className="bg-black/500 rounded-md h-24 sm:h-36 w-24 sm:w-36 min-w-24 sm:min-w-36 object-contain"
            loading="lazy"
            src={product.image}
          />
          <div className="flex flex-col justify-between gap-1 w-full">
            <div className="flex flex-col gap-1">
              <p className="font-medium">{product.title}</p>
              <p className="text-sm text-white/50">{product.description}</p>
            </div>
            <div className="flex items-end justify-between">
              <p className="text-green-500 text-sm font-medium">{parseCurrency(product.price)}</p>
              <Button
                size="xs"
                onClick={() => (product.options ? setIsModalOpen(true) : onAdd(cartItem))}
              >
                Agregar
              </Button>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen ? (
        <CartItemDrawer
          isOpen
          item={cartItem}
          onClose={() => setIsModalOpen(false)}
          onSubmit={(item: CartItem) => {
            onAdd(item);
            setIsModalOpen(false);
          }}
        />
      ) : null}
    </>
  );
}

export default ProductCard;
