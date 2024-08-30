import type {Option as IOption, Product as IProduct} from "./types";

import Papa from "papaparse";
import {notFound} from "next/navigation";

interface RawOption extends IOption {
  type: "option";
}

interface RawProduct extends IProduct {
  type: "product";
}

interface RawUnknown extends IProduct {
  type: string;
}

class Product implements IProduct {
  id: IProduct["id"];
  title: IProduct["title"];
  category: IProduct["category"];
  description: IProduct["description"];
  image: IProduct["image"];
  options: IProduct["options"];
  price: IProduct["price"];

  constructor() {
    this.options = {} as Product["options"];
  }

  set(product: RawProduct) {
    Object.assign(this, {
      id: product.id,
      title: product.title,
      category: product.category,
      description: product.description,
      image: product.image,
      price: Number(product.price),
    });
  }

  addOption(option: RawOption) {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!this.options![option.category]) {
      this.options![option.category] = [];
    }

    this.options![option.category].push({
      id: option.id,
      title: option.title,
      category: option.category,
      description: option.description,
      image: option.image,
      price: Number(option.price),
    });
  }

  toJSON(): IProduct {
    const product = {
      id: this.id,
      title: this.title,
      category: this.category,
      description: this.description,
      image: this.image,
      options: this.options,
      price: Number(this.price),
    };

    if (Object.keys(product.options!).length === 0) {
      delete product.options;
    }

    return product;
  }
}

function normalize(data: (RawProduct | RawOption | RawUnknown)[]) {
  const products = new Map<RawProduct["id"], Product>();

  for (const item of data) {
    switch (item.type) {
      case "product":
        const baseProduct = new Product();

        baseProduct.set(item as RawProduct);

        products.set(baseProduct.id, baseProduct);
        break;

      case "option":
        const existingProduct = products.get(item.id);

        if (existingProduct) {
          existingProduct.addOption(item as RawOption);
        }
        break;
    }
  }

  const normalized: IProduct[] = Object.values(Object.fromEntries(products)).map((product) =>
    product.toJSON(),
  );

  return normalized;
}

const api = {
  list: async (): Promise<IProduct[]> => {
    // Uncomment to use the mock data
    // return await import(`./mocks/default.json`).then(
    //   (module: {default: IProduct[]}) => module.default,
    // );

    return fetch(process.env.PRODUCTS!, {next: {tags: ["products"]}}).then(async (response) => {
      const csv = await response.text();

      return new Promise<IProduct[]>((resolve, reject) => {
        Papa.parse(csv, {
          header: true,
          complete: (results) => {
            const data = normalize(results.data as (RawProduct | RawOption | RawUnknown)[]);

            return resolve(data);
          },
          error: (error: Error) => reject(error.message),
        });
      });
    });
  },
  fetch: async (id: IProduct["id"]): Promise<IProduct> => {
    // Uncomment to use the mock data
    // return await import(`./mocks/default.json`).then(
    //   (module: {default: IProduct[]}) => module.default.find((product) => product.id === id)!,
    // );

    const products = await api.list();
    const product = products.find((product) => product.id === id);

    if (!product) return notFound();

    return product;
  },
};

export default api;
