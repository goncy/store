import {expect, test} from "@playwright/test";

import products from "../../src/modules/product/mocks/default.json";
import store from "../../src/modules/store/mocks/default.json";

const product = products.find((product) => product.title === "Dulce de leche")!;

test("busca, elige opciones y prepara el pedido", async ({page}) => {
  await page.goto("/");
  await expect(page).toHaveTitle(store.title);
  await page.getByPlaceholder("Buscar...").fill(product.title);
  await expect(page.getByTestId("product").filter({visible: true})).toHaveCount(1);
  await page.getByRole("link").filter({hasText: product.title}).click();
  await expect(page.getByRole("dialog", {name: product.title})).toBeVisible();
  await page.getByRole("radio", {name: /1 KG/}).check();
  await page.getByRole("radio", {name: /Alta/}).check();
  await page.getByRole("button", {name: "Agregar al pedido"}).click();
  await page.getByRole("button", {name: "Ver pedido"}).click();
  await expect(page.getByTestId("cart")).toContainText("Peso: 1 KG, Calidad: Alta");
  await page.getByTestId("increment").click();
  await expect(page.getByTestId("quantity")).toHaveText("2");
  await page.getByTestId("continue-order").click();
  await page.getByPlaceholder("Mi casa 123").fill("Calle de prueba 123");
  await page.getByRole("radio", {name: "Efectivo", exact: true}).check();
  const href = await page.getByRole("link", {name: "Completar pedido"}).getAttribute("href");
  const url = new URL(href!);
  const message = url.searchParams.get("text");

  expect(url.pathname).toBe(`/${store.phone}`);
  expect(message).toContain("Dulce de leche (X2) [Peso: 1 KG, Calidad: Alta]");
  expect(message).toContain("Direccion de envio: Calle de prueba 123");
  expect(message).toContain("Forma de pago: Efectivo");
  expect(message).toContain("538,00");
});

test("la actualización de caché requiere el secreto", async ({request}) => {
  expect((await request.get("/refresh?secret=invalid")).status()).toBe(401);
  expect((await request.get("/refresh?secret=local-test-secret")).status()).toBe(200);
});

test("muestra un error para productos inexistentes", async ({page}) => {
  for (const path of ["/no-existe", "/no-existe/extra"]) {
    await page.goto(path);
    await expect(page.getByRole("heading", {name: "404", exact: true})).toBeVisible();
  }
});

test("un nuevo pedido empieza sin las opciones del pedido anterior", async ({page}) => {
  await page.goto("/");
  await page.getByRole("link").filter({hasText: product.title}).click();
  await page.getByRole("radio", {name: /1 KG/}).check();
  await page.getByRole("radio", {name: /Alta/}).check();
  await page.getByRole("button", {name: "Agregar al pedido"}).click();
  await page.getByRole("link").filter({hasText: product.title}).click();

  await expect(page.getByRole("radio", {name: /1 KG/})).not.toBeChecked();
  await expect(page.getByRole("radio", {name: /Alta/})).not.toBeChecked();
  await expect(page.getByRole("dialog")).toContainText("169,00");

  await page.getByRole("radio", {name: /1 KG/}).check();
  await page.getByRole("button", {name: "Cerrar", exact: true}).click();
  await page.getByRole("link").filter({hasText: product.title}).click();
  await expect(page.getByRole("radio", {name: /1 KG/})).not.toBeChecked();
});

test("un producto del catálogo carga directamente y por enlace", async ({page}) => {
  await page.goto(`/${product.id}`);
  await expect(page.getByRole("dialog", {name: product.title})).toBeVisible();
  await page.getByRole("button", {name: "Cerrar", exact: true}).click();
  await expect(page.getByTestId("product").filter({visible: true})).toHaveCount(products.length);

  await page.getByRole("link").filter({hasText: product.title}).click();
  await expect(page).toHaveURL(`/${product.id}`);
  await expect(page.getByRole("dialog", {name: product.title})).toBeVisible();
});
