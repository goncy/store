import {editCart} from "../selectors";
import {CartItem, Product} from "../types";

describe("editCart", () => {
  it("deberia reducir la cantidad de un producto en uno", () => {
    const product: Product = {
      id: "id",
      category: "category",
      description: "description",
      image: "image",
      price: 100,
      title: "title",
    };
    const actual: CartItem[] = [{...product, quantity: 5}];
    const expected: CartItem[] = [{...product, quantity: 4}];

    expect(editCart(product, "decrement")(actual)).toEqual(expected);
  });

  it("deberia aumentar la cantidad de un producto en uno", () => {
    const product: Product = {
      id: "id",
      category: "category",
      description: "description",
      image: "image",
      price: 100,
      title: "title",
    };
    const actual: CartItem[] = [{...product, quantity: 5}];
    const expected: CartItem[] = [{...product, quantity: 6}];

    expect(editCart(product, "increment")(actual)).toEqual(expected);
  });

  it("deberia borrar un producto si reducimos y la cantidad era uno", () => {
    const product: Product = {
      id: "id",
      category: "category",
      description: "description",
      image: "image",
      price: 100,
      title: "title",
    };
    const actual: CartItem[] = [{...product, quantity: 1}];
    const expected: CartItem[] = [];

    expect(editCart(product, "decrement")(actual)).toEqual(expected);
  });
});
