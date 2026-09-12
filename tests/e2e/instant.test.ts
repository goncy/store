import {expect, test} from "@playwright/test";
import {instant} from "@next/playwright";

import products from "../../src/modules/product/mocks/default.json";

const product = products.find((product) => product.title === "Dulce de leche")!;

test("el catálogo se muestra en la carga inicial sin esperar datos dinámicos", async ({
  page,
  baseURL,
}) => {
  await instant(
    page,
    async () => {
      await page.goto("/");
      await expect(page.getByTestId("product").filter({visible: true})).toHaveCount(
        products.length,
      );
    },
    {baseURL},
  );
});

test("el producto se muestra al navegar sin esperar datos dinámicos", async ({page}) => {
  await page.goto("/");

  await instant(page, async () => {
    await page.getByRole("link").filter({hasText: product.title}).click();
    await expect(page.getByRole("dialog", {name: product.title})).toBeVisible();
  });
});

test("un producto del catálogo carga directamente sin esperar datos dinámicos", async ({
  page,
  baseURL,
}) => {
  await instant(
    page,
    async () => {
      await page.goto(`/${product.id}`);
      await expect(page.getByRole("dialog", {name: product.title})).toBeVisible();
      await expect(page.getByRole("radio", {name: /1 KG/})).toBeVisible();
    },
    {baseURL},
  );
});
