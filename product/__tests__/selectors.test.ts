import {editCart} from "../selectors";
import {CartItem, Product} from "../types";

const product: Product = {
  id: "id",
  category: "category",
  description: "description",
  image: "image",
  price: 100,
  title: "title",
};

describe("editCart", () => {
  it("deberia reducir la cantidad de un producto en uno", () => {
    const actual: CartItem[] = [{...product, quantity: 5}];
    const expected: CartItem[] = [{...product, quantity: 4}];

    expect(editCart(product, "decrement")(actual)).toEqual(expected);
  });

  it("deberia aumentar la cantidad de un producto en uno", () => {
    const actual: CartItem[] = [{...product, quantity: 5}];
    const expected: CartItem[] = [{...product, quantity: 6}];

    expect(editCart(product, "increment")(actual)).toEqual(expected);
  });

  it("deberia borrar un producto si reducimos y la cantidad era uno", () => {
    const actual: CartItem[] = [{...product, quantity: 1}];
    const expected: CartItem[] = [];

    expect(editCart(product, "decrement")(actual)).toEqual(expected);
  });

  it("deberia agregar el producto con cantidad uno si no existia", () => {
    const actual: CartItem[] = [];
    const expected: CartItem[] = [{...product, quantity: 1}];

    expect(editCart(product, "increment")(actual)).toEqual(expected);
  });

  it("deberia cambiar solo el producto esperado", () => {
    const actual: CartItem[] = [
      {...product, quantity: 1},
      {...product, id: "other", quantity: 1},
    ];
    const expected: CartItem[] = [
      {...product, quantity: 2},
      {...product, id: "other", quantity: 1},
    ];

    expect(editCart(product, "increment")(actual)).toEqual(expected);
  });

  it("deberia retornar lo mismo si el action es invalido", () => {
    const actual: CartItem[] = [{...product, quantity: 1}];
    const expected: CartItem[] = actual;

    expect(editCart(product, "invalid" as any)(actual)).toEqual(expected);
  });
});
