"use client";

import type {Field} from "~/cart/types";
import type {Product} from "~/product/types";

import type {Store} from "../types";

import {useMemo, useState} from "react";
import {SearchIcon, X, Table, StretchHorizontal, ChevronDown} from "lucide-react";

import {Button} from "~/ui/components/control/button";
import CartDrawer from "~/cart/components/CartDrawer";
import {useCart} from "~/cart/context";
import ProductCard from "~/product/components/ProductCard";
import {Input} from "~/ui/components/form/input";

import {Toggle} from "@/modules/ui/components/form/toggle";
import {cn} from "@/modules/ui/utils";

function StoreScreen({
  fields,
  products,
  store,
}: {
  fields: Field[];
  products: Product[];
  store: Store;
}) {
  const [{total, quantity}, {addItem}] = useCart();
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const [layout, setLayout] = useState<"list" | "grid">(() =>
    products.length > 50 ? "list" : "grid",
  );
  const [selectedCategory, setSelectedCategory] = useState<Product["category"] | null>(null);
  const categories = useMemo<[Product["category"], Product[]][]>(() => {
    let draft = products;

    // Filter products by search query
    if (query) {
      draft = draft.filter(({title, description}) =>
        (title.toLowerCase() + description.toLowerCase()).includes(query.toLowerCase()),
      );
    }

    // Group products by category
    const groups = draft.reduce<Map<Product["category"], Product[]>>((map, product) => {
      if (!map.has(product.category)) {
        map.set(product.category, []);
      }

      map.set(product.category, map.get(product.category)!.concat(product));

      return map;
    }, new Map());

    // Return them in a tuple of [category, products]
    return Array.from(groups.entries());
  }, [query, products]);

  function handleSelectCategory(category: Product["category"]) {
    setSelectedCategory((currentSelectedCategory) =>
      currentSelectedCategory === category ? null : category,
    );

    // Scroll to the category
    queueMicrotask(() => {
      const categoryElement = document.getElementById(category);

      if (categoryElement) {
        categoryElement.scrollIntoView({block: "start", inline: "start"});
      }
    });
  }

  return (
    <>
      <div className="flex flex-col gap-4 sm:gap-8">
        {/* Filters */}
        <div className="flex items-center justify-between gap-4">
          <div className="relative flex w-full items-center sm:max-w-xs">
            <SearchIcon className="absolute left-3 h-4 w-4 opacity-40" />
            <Input
              className="px-9"
              placeholder="Buscar..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            {Boolean(query) && (
              <X
                className="absolute right-3 h-4 w-4 cursor-pointer opacity-40"
                onClick={() => setQuery("")}
              />
            )}
          </div>
          <div className="flex gap-2">
            <Toggle
              aria-label="Vista de lista"
              pressed={layout === "list"}
              onClick={() => setLayout("list")}
            >
              <div className="text-2xl">
                <StretchHorizontal className="h-6 w-6 cursor-pointer opacity-40" />
              </div>
            </Toggle>
            <Toggle
              aria-label="Vista de grilla"
              pressed={layout === "grid"}
              onClick={() => setLayout("grid")}
            >
              <div className="text-2xl">
                <Table className="h-6 w-6 cursor-pointer opacity-40" />
              </div>
            </Toggle>
          </div>
        </div>
        {/* Grid of products by category */}
        <div className="flex flex-col">
          {categories.length ? (
            categories.map(([category, categoryProducts]) => (
              <div
                key={category}
                className="flex flex-col gap-8 border-t py-4 last-of-type:border-b sm:py-8"
                id={category}
              >
                <div
                  className={cn("flex items-center justify-between gap-4", {
                    "cursor-pointer": layout === "list",
                  })}
                  onClick={() => handleSelectCategory(category)}
                >
                  <h2 className="text-xl font-semibold sm:text-2xl">
                    {category} <span className="opacity-70">({categoryProducts.length})</span>
                  </h2>
                  {layout === "list" && <ChevronDown className="h-6 w-6 opacity-40" />}
                </div>
                {((layout === "list" && selectedCategory === category) || layout === "grid") && (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {categoryProducts.length ? (
                      categoryProducts.map((product) => (
                        <ProductCard
                          key={product.id}
                          product={product}
                          onAdd={(item: Product) => addItem(Date.now(), {...item, quantity: 1})}
                        />
                      ))
                    ) : (
                      <div className="flex flex-col gap-4">
                        <h2 className="text-2xl font-semibold">No hay productos</h2>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-semibold">No hay productos</h2>
            </div>
          )}
        </div>
        {/* Cart button */}
        {Boolean(quantity) && (
          <div className="sticky bottom-4 flex content-center items-center sm:m-auto">
            <Button
              aria-label="Ver pedido"
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
      {/* Cart Drawer */}
      {Boolean(isCartOpen) && (
        <CartDrawer fields={fields} store={store} onClose={() => setIsCartOpen(false)} />
      )}
    </>
  );
}

export default StoreScreen;
