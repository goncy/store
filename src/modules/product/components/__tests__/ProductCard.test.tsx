import type {Product} from "../../types";

import {render, screen} from "@testing-library/react";
import {expect, test} from "vitest";

import ProductCard from "../ProductCard";

const product: Product = {
  id: "id",
  image: "/product.png",
  price: 100,
  title: "Hamburguesa",
  category: "Comidas",
  description: "Con queso",
};

test("muestra el título, descripción, precio e imagen", () => {
  render(<ProductCard product={product} />);
  expect(screen.getByText(product.title)).toBeVisible();
  expect(screen.getByText(product.description)).toBeVisible();
  expect(screen.getByText(/100/)).toBeVisible();
  expect(screen.getByRole("img", {name: product.title})).toHaveAttribute("src", product.image);
});

test("muestra el producto sin una imagen", () => {
  render(<ProductCard product={{...product, image: ""}} />);
  expect(screen.getByText(product.title)).toBeVisible();
  expect(screen.queryByRole("img")).not.toBeInTheDocument();
});
