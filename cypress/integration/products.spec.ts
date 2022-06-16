import mock from "../../product/mocks/default.json";

describe("Products", () => {
  it("deberia mostrar todos los productos", () => {
    cy.visit("/default");

    cy.get('[data-testid="product"]').should(
      "have.length",
      mock.filter((item) => item.type === "product").length,
    );
  });

  it("muestra un mensaje cuando no hay productos", () => {
    cy.visit("/empty");

    cy.get('[data-testid="product"]').should("have.length", 0);

    cy.contains("No hay productos");
  });

  it("muestra el drawer del carrito y lo cierra correctamente, asegurandose de que el link es valido", () => {
    cy.visit("/default");

    cy.get('[data-testid="cart"]').should("not.exist");
    cy.get('[data-testid="product"] button').first().click();
    cy.get('[data-testid="show-cart"]').click();
    cy.get('[data-testid="cart"]').should("be.visible");
    cy.get('[data-testid="complete-order"]').should("have.attr", "href").and("contain", "wa.me");
    cy.get('[aria-label="Close"]').click();
    cy.get('[data-testid="cart"]').should("not.exist");
  });
});
