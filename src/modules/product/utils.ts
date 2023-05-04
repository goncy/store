import type {Product} from "./types";

export function groupByCategory(products: Product[]): [Product["category"], Product[]][] {
  const groups = products.reduce<Record<Product["category"], Product[]>>((acc, product) => {
    const category = product.category;

    if (!acc[category]) {
      acc[category] = [];
    }

    acc[category].push(product);

    return acc;
  }, {});

  return Object.entries(groups);
}
