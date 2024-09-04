"use client";

import type {Product} from "~/product/types";

import {useMemo, useState} from "react";
import {SearchIcon, X, Table, StretchHorizontal, ChevronDown} from "lucide-react";
import Link from "next/link";
import {useRouter} from "next/navigation";

import {useCart} from "~/cart/context/client";
import ProductCard from "~/product/components/ProductCard";

import {cn} from "@/lib/utils";
import {Input} from "@/components/ui/input";
import {Toggle} from "@/components/ui/toggle";
import CartItemDrawer from "@/modules/cart/components/CartItemDrawer";

function StoreScreen({products, selected}: {products: Product[]; selected: null | Product}) {
  const [, {addItem}] = useCart();
  const router = useRouter();
  const [query, setQuery] = useState<string>("");
  const [layout, setLayout] = useState<"list" | "grid">(() =>
    products.length > 30 ? "list" : "grid",
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
      const categoryElement = document.getElementById(category)!;
      const filtersElement = document.getElementById("filters")!;
      const offset = filtersElement.getBoundingClientRect().height;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = categoryElement.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
      });
    });
  }

  return (
    <>
      <div className="flex flex-col">
        {/* Filters */}
        <div
          className="sticky top-0 z-10 flex items-center justify-between gap-4 bg-background py-4"
          id="filters"
        >
          <div className="relative flex w-full items-center sm:max-w-xs">
            <SearchIcon className="absolute left-3 h-4 w-4 opacity-40" />
            <Input
              className="px-9"
              placeholder="Buscar..."
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
              }}
            />
            {Boolean(query) && (
              <X
                className="absolute right-3 h-4 w-4 cursor-pointer opacity-40"
                onClick={() => {
                  setQuery("");
                }}
              />
            )}
          </div>
          <div className="flex gap-2">
            <Toggle
              aria-label="Vista de lista"
              pressed={layout === "list"}
              onClick={() => {
                setLayout("list");
              }}
            >
              <div className="text-2xl">
                <StretchHorizontal className="h-6 w-6 cursor-pointer opacity-40" />
              </div>
            </Toggle>
            <Toggle
              aria-label="Vista de grilla"
              pressed={layout === "grid"}
              onClick={() => {
                setLayout("grid");
              }}
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
              <div key={category} className="flex flex-col gap-4 border-t py-4" id={category}>
                <div
                  className={cn("flex items-center justify-between gap-4", {
                    "cursor-pointer": layout === "list",
                  })}
                  onClick={() => {
                    handleSelectCategory(category);
                  }}
                >
                  <h2 className="text-xl font-medium sm:text-2xl">
                    {category} <span className="opacity-70">({categoryProducts.length})</span>
                  </h2>
                  {layout === "list" && <ChevronDown className="h-6 w-6 opacity-40" />}
                </div>
                {((layout === "list" && selectedCategory === category) || layout === "grid") && (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {categoryProducts.length ? (
                      categoryProducts.map((product) => (
                        <Link
                          key={product.id}
                          href={`/${product.id}`}
                          prefetch={false}
                          scroll={false}
                        >
                          <ProductCard product={product} />
                        </Link>
                      ))
                    ) : (
                      <div className="my-12 flex flex-col gap-4">
                        <h2 className="text-center text-xl text-muted-foreground">
                          No hay productos
                        </h2>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="my-12 flex flex-col gap-4">
              <h2 className="text-center text-xl text-muted-foreground">No hay productos</h2>
            </div>
          )}
        </div>
      </div>
      {Boolean(selected) && (
        <CartItemDrawer
          open
          item={{...selected!, quantity: 1}}
          onClose={() => router.push("/", {scroll: false})}
          onSubmit={(item) => {
            addItem(Date.now(), item);
            router.push("/", {scroll: false});
          }}
        />
      )}
    </>
  );
}

export default StoreScreen;
