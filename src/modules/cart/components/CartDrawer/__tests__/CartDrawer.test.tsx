import type {CartItem} from "../../../types";

import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {expect, test} from "vitest";

import store from "~/store/mocks/default.json";

import CartProviderClient, {useCart} from "../../../context/client";

const item: CartItem = {
  id: "id",
  image: "",
  price: 100,
  title: "Hamburguesa",
  category: "Comidas",
  description: "Con queso",
  quantity: 2,
};

function AddItem() {
  const [, {addItem}] = useCart();

  return (
    <button type="button" onClick={() => addItem(1, item)}>
      Agregar
    </button>
  );
}

async function openCart() {
  const user = userEvent.setup();

  render(
    <CartProviderClient fields={[]} store={store}>
      <AddItem />
    </CartProviderClient>,
  );
  await user.click(screen.getByRole("button", {name: "Agregar"}));
  await user.click(screen.getByRole("button", {name: "Ver pedido"}));

  return user;
}

test("actualiza la cantidad y elimina el último producto", async () => {
  const user = await openCart();

  expect(screen.getByTestId("quantity")).toHaveTextContent("2");
  await user.click(screen.getByTestId("increment"));
  expect(screen.getByTestId("quantity")).toHaveTextContent("3");
  await user.click(screen.getByTestId("decrement"));
  await user.click(screen.getByTestId("decrement"));
  await user.click(screen.getByTestId("decrement"));
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  expect(screen.queryByRole("button", {name: "Ver pedido"})).not.toBeInTheDocument();
});

test("incluye la cantidad y el total en el enlace de WhatsApp", async () => {
  const user = await openCart();

  await user.click(screen.getByTestId("continue-order"));
  const link = screen.getByRole("link", {name: "Completar pedido"});
  const url = new URL(link.getAttribute("href")!);

  expect(url.hostname).toBe("wa.me");
  expect(url.searchParams.get("text")).toContain("Hamburguesa (X2)");
  expect(url.searchParams.get("text")).toContain("200,00");
});
