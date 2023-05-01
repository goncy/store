import type {Option as IOption, Product as IProduct} from "./types";

import Papa from "papaparse";

interface RawOption extends IOption {
  type: "option";
}

interface RawProduct extends IProduct {
  type: "product";
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

function normalize(data: (RawProduct | RawOption)[]) {
  const products = new Map<RawProduct["id"], Product>();

  for (const item of data) {
    if (!products.has(item.id)) {
      products.set(item.id, new Product());
    }

    const product = products.get(item.id)!;

    switch (item.type) {
      case "product":
        product.set(item);
        break;

      case "option":
        product.addOption(item);
        break;
    }
  }

  const normalized: IProduct[] = Object.values(Object.fromEntries(products)).map((product) =>
    product.toJSON(),
  );

  return normalized;
}

export default {
  list: async (): Promise<IProduct[]> => {
    return fetch(process.env.PRODUCTS_CSV!).then(async (response) => {
      const csv = await response.text();

      return new Promise<IProduct[]>((resolve, reject) => {
        Papa.parse(csv, {
          header: true,
          complete: (results) => {
            const data = normalize(results.data as (RawProduct | RawOption)[]);

            return resolve(data);
          },
          error: (error: Error) => reject(error.message),
        });
      });
    });
  },
  mock: {
    list: (mock: string): Promise<IProduct[]> =>
      import(`./mocks/${mock}.json`).then((result: {default: (RawProduct | RawOption)[]}) =>
        normalize(result.default),
      ),
  },
};
