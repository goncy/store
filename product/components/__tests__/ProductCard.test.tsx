import * as React from "react";
import {render, screen, fireEvent} from "@testing-library/react";

import ProductCard from "../ProductCard";
import {Product} from "../../types";

const product: Product = {
  id: "id",
  image: "image",
  price: 100,
  title: "title",
  category: "category",
  description: "description",
};

test("deberia mostrar el titulo, precio y boton", () => {
  render(<ProductCard product={product} onAdd={jest.fn()} />);

  const priceRegex = new RegExp(String(product.price), "i");

  expect(screen.getByText(product.title)).toBeInTheDocument();
  expect(screen.getByText(priceRegex)).toBeInTheDocument();
  expect(screen.getByText("Agregar")).toBeInTheDocument();
});

test("deberia ejecutar onAdd cuando clickeo en agregar", () => {
  const onAdd = jest.fn();

  render(<ProductCard product={product} onAdd={onAdd} />);

  fireEvent.click(screen.getByText("Agregar"));

  expect(onAdd).toHaveBeenCalled();
});
