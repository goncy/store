import type {Product} from "../../types";

import * as React from "react";
import {render, screen, fireEvent} from "@testing-library/react";

import ProductCard from "../ProductCard";

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

test("deberia ejecutar onAdd cuando clickeo en agregar y no tengo opciones", () => {
  const onAdd = jest.fn();

  render(<ProductCard product={product} onAdd={onAdd} />);

  fireEvent.click(screen.getByText("Agregar"));

  expect(onAdd).toHaveBeenCalled();
});

test("deberia ejecutar onAdd cuando clickeo en agregar y tengo opciones", () => {
  const onAdd = jest.fn();

  render(
    <ProductCard
      product={{
        ...product,
        options: {
          Peso: [
            {
              id: "",
              category: "Peso",
              title: "500 GR",
              price: 100,
              description: "",
              image: "",
            },
          ],
        },
      }}
      onAdd={onAdd}
    />,
  );

  fireEvent.click(screen.getByText("Agregar"));

  expect(screen.getByTestId("cart-item-drawer")).toBeInTheDocument();
});
