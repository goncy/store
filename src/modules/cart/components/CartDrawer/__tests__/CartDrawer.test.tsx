import type {CartItem} from "../../../types";

import * as React from "react";
import {render, screen, within} from "@testing-library/react";

import CartDrawer from "../CartDrawer";
import * as cartContext from "../../../context/client";

jest.mock("../../../context");

const cartItem: CartItem = {
  id: "id",
  image: "image",
  price: 100,
  title: "title",
  category: "category",
  description: "description",
  quantity: 2,
};

test("deberia mostrar la cantidad de productos en un item en el detalle", () => {
  const cart = new Map<CartItem["id"], CartItem>([[cartItem.id, cartItem]]);

  jest.spyOn<any, any>(cartContext, "useCart").mockReturnValue([{cart}, {}]);

  render(<CartDrawer isOpen fields={[]} onClose={jest.fn()} />);

  expect(screen.getByTestId("quantity")).toHaveTextContent(String(cartItem.quantity));
});

test("deberia mostrar la cantidad de productos en el detalle", () => {
  const cart = new Map<CartItem["id"], CartItem>([[cartItem.id, cartItem]]);

  jest.spyOn<any, any>(cartContext, "useCart").mockReturnValue([{cart}, {}]);

  render(<CartDrawer isOpen fields={[]} onClose={jest.fn()} />);

  const item = screen.getByTestId(`cart-item-${cartItem.id}`);
  const quantityElement = within(item).getByTestId("quantity");
  const quantity = within(quantityElement).getByText(String(cartItem.quantity));

  expect(quantity).toBeInTheDocument();
});

// test("deberia llamar a onDecrement cuando resto un producto", () => {
//   const onDecrement = jest.fn();

//   render(<CartDrawer isOpen fields={[]} onClose={jest.fn()} />);

//   fireEvent.click(screen.getByTestId("decrement"));

//   expect(onDecrement).toHaveBeenCalled();
// });

// test("deberia llamar a onIncrement cuando incremento un producto", () => {
//   const onIncrement = jest.fn();

//   render(<CartDrawer isOpen fields={[]} onClose={jest.fn()} />);

//   fireEvent.click(screen.getByTestId("increment"));

//   expect(onIncrement).toHaveBeenCalled();
// });

// test("deberia mostrar la cantidad de productos en el mensaje de whatsapp si es uno", () => {
//   render(<CartDrawer isOpen fields={[]} onClose={jest.fn()} />);

//   const link = screen.getByTestId("complete-order");

//   expect(link.getAttribute("href")).not.toMatch(`(X${String(cartItem.quantity)})`);
// });

// test("no deberia mostrar la cantidad de productos en el mensaje de whatsapp si es uno", () => {
//   render(<CartDrawer isOpen fields={[]} onClose={jest.fn()} />);

//   const link = screen.getByTestId("complete-order");

//   expect(link.getAttribute("href")).not.toMatch(`(X${String(cartItem.quantity)})`);
// });

// test("muestro un mensaje de que no hay items cuando el product esta vacio", () => {
//   render(<CartDrawer isOpen fields={[]} onClose={jest.fn()} />);

//   expect(screen.getByText("No hay elementos en tu carrito")).toBeInTheDocument();
// });
