import type {CartItem} from "~/cart/types";

import type {Product} from "../types";

import {useState, useMemo} from "react";

import CartItemDrawer from "~/cart/components/CartItemDrawer";
import {parseCurrency} from "~/currency/utils";

function ProductCard({product, onAdd}: {product: Product; onAdd: (product: Product) => void}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cartItem = useMemo<CartItem>(() => ({...product, quantity: 1}), [product]);

  return (
    <>
      <div
        key={product.id}
        className="border-white/300 flex cursor-pointer items-center justify-between gap-3 rounded-md border"
        data-testid="product"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="flex w-full gap-4 p-2">
          <img
            alt={product.title}
            className="bg-black/500 min-w-24 sm:min-w-36 aspect-square h-24 w-24 rounded-md object-cover sm:h-36 sm:w-36"
            loading="lazy"
            src={product.image}
          />
          <div className="flex w-full flex-col justify-between gap-1">
            <div className="flex flex-col gap-1">
              <p className="font-medium">{product.title}</p>
              <p className="text-muted-foreground line-clamp-[2] text-sm sm:line-clamp-4">
                {product.description}
              </p>
            </div>
            <div className="flex items-end">
              <p className="text-incentive text-sm font-medium">{parseCurrency(product.price)}</p>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen ? (
        <CartItemDrawer
          open
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
