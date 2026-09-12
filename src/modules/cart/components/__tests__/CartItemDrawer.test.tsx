import type {CartItem} from "../../types";

import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {expect, test, vi} from "vitest";

import CartItemDrawer from "../CartItemDrawer";

const item: CartItem = {
  id: "hamburguesa",
  title: "Hamburguesa",
  description: "Con queso",
  category: "Comidas",
  image: "",
  price: 1000,
  quantity: 1,
  options: {
    Tamaño: [
      {id: "simple", title: "Simple", category: "Tamaño", image: "", description: "", price: 0},
      {id: "doble", title: "Doble", category: "Tamaño", image: "", description: "", price: 500},
    ],
  },
};

test("actualiza el precio y el pedido al elegir opciones con el teclado", async () => {
  const user = userEvent.setup();
  const onSubmit = vi.fn();

  render(<CartItemDrawer open item={item} onClose={vi.fn()} onSubmit={onSubmit} />);
  await user.click(screen.getByRole("radio", {name: "Simple"}));
  await user.keyboard("{ArrowDown}");

  expect(screen.getByRole("radio", {name: /Doble/})).toBeChecked();
  expect(screen.getByText(/1.500,00/)).toBeVisible();

  await user.click(screen.getByRole("button", {name: "Agregar al pedido"}));

  expect(onSubmit).toHaveBeenCalledWith({...item, options: {Tamaño: [item.options!.Tamaño[1]]}});
});

test("cierra el selector con Escape", async () => {
  const user = userEvent.setup();
  const onClose = vi.fn();

  render(<CartItemDrawer open item={item} onClose={onClose} onSubmit={vi.fn()} />);

  await user.keyboard("{Escape}");

  expect(onClose).toHaveBeenCalledOnce();
});
