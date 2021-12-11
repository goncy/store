import * as React from "react";
import {render, screen, fireEvent} from "@testing-library/react";

import CartDrawer from "../CartDrawer";
import {CartItem} from "../../types";

const product: CartItem = {
  id: "id",
  image: "image",
  price: 100,
  title: "title",
  category: "category",
  description: "description",
  quantity: 2,
};

test("deberia mostrar la cantidad de productos en un item", () => {
  render(
    <CartDrawer
      isOpen
      items={[product]}
      onClose={jest.fn()}
      onDecrement={jest.fn()}
      onIncrement={jest.fn()}
    />,
  );

  expect(screen.getByTestId("quantity")).toHaveTextContent(String(product.quantity));
});

test("deberia mostrar la cantidad de productos en el mensaje de whatsapp si es mayor a uno", () => {
  render(
    <CartDrawer
      isOpen
      items={[product]}
      onClose={jest.fn()}
      onDecrement={jest.fn()}
      onIncrement={jest.fn()}
    />,
  );

  const link = screen.getByTestId("complete-order");

  expect(link.getAttribute("href")).toMatch(`(X${String(product.quantity)})`);
});

test("no deberia mostrar la cantidad de productos en el mensaje de whatsapp si es uno", () => {
  render(
    <CartDrawer
      isOpen
      items={[{...product, quantity: 1}]}
      onClose={jest.fn()}
      onDecrement={jest.fn()}
      onIncrement={jest.fn()}
    />,
  );

  const link = screen.getByTestId("complete-order");

  expect(link.getAttribute("href")).not.toMatch(`(X${String(product.quantity)})`);
});

test("deberia llamar a onDecrement cuando resto un producto", () => {
  const onDecrement = jest.fn();

  render(
    <CartDrawer
      isOpen
      items={[product]}
      onClose={jest.fn()}
      onDecrement={onDecrement}
      onIncrement={jest.fn()}
    />,
  );

  fireEvent.click(screen.getByTestId("decrement"));

  expect(onDecrement).toHaveBeenCalled();
});

test("deberia llamar a onIncrement cuando incremento un producto", () => {
  const onIncrement = jest.fn();

  render(
    <CartDrawer
      isOpen
      items={[product]}
      onClose={jest.fn()}
      onDecrement={jest.fn()}
      onIncrement={onIncrement}
    />,
  );

  fireEvent.click(screen.getByTestId("increment"));

  expect(onIncrement).toHaveBeenCalled();
});

test("muestro un mensaje de que no hay items cuando el product esta vacio", () => {
  render(
    <CartDrawer
      isOpen
      items={[]}
      onClose={jest.fn()}
      onDecrement={jest.fn()}
      onIncrement={jest.fn()}
    />,
  );

  expect(screen.getByText("No hay elementos en tu carrito")).toBeInTheDocument();
});
