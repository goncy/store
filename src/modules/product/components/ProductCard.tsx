"use client";

import type {Product} from "../types";

import {ImageOff} from "lucide-react";

import {parseCurrency} from "~/currency/utils";

function ProductCard({product}: {product: Product}) {
  return (
    <div
      key={product.id}
      className="border-white/300 flex items-center justify-between gap-3 rounded-md border"
      data-testid="product"
    >
      <div className="flex h-full w-full gap-4 p-4">
        <div className="flex w-full flex-col justify-between gap-1">
          <div className="flex flex-col gap-1">
            <p className="line-clamp-[1] font-medium sm:line-clamp-[2]">{product.title}</p>
            <p className="line-clamp-[2] text-sm text-muted-foreground sm:line-clamp-3">
              {product.description}
            </p>
          </div>
          <div className="flex items-end">
            <p className="text-sm font-medium text-incentive">{parseCurrency(product.price)}</p>
          </div>
        </div>
        {product.image ? (
          <img
            alt={product.title}
            className="aspect-square h-24 w-24 min-w-24 rounded-md bg-muted/50 object-cover sm:h-36 sm:w-36 sm:min-w-36"
            loading="lazy"
            src={product.image}
          />
        ) : (
          <div className="flex aspect-square h-24 w-24 min-w-24 items-center justify-center rounded-md bg-muted/50 object-cover sm:h-36 sm:w-36 sm:min-w-36">
            <ImageOff className="m-auto h-12 w-12 opacity-10 sm:h-16 sm:w-16" />
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
