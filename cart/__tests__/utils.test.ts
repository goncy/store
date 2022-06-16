import {getCartItemOptionsSummary, getCartItemPrice, getCartMessage, getCartTotal} from "../utils";
import {CartItem} from "../types";

const item: CartItem = {
  id: "id",
  category: "category",
  description: "description",
  image: "image",
  price: 100,
  title: "title",
  quantity: 1,
};

describe("getCartItemPrice", () => {
  describe("Sin opciones", () => {
    it("debería devolver el precio correcto cuando hay una unidad", () => {
      const actual: number = getCartItemPrice(item);
      const expected = 100;

      expect(actual).toEqual(expected);
    });

    it("debería devolver el precio correcto cuando hay más de una unidad", () => {
      const actual: number = getCartItemPrice({...item, quantity: 2});
      const expected = 200;

      expect(actual).toEqual(expected);
    });
  });

  describe("Con opciones", () => {
    it("debería devolver el precio correcto cuando hay una unidad", () => {
      const actual: number = getCartItemPrice({
        ...item,
        options: {
          Peso: [
            {
              category: "Peso",
              id: "",
              description: "",
              image: "",
              price: 50,
              title: "Medio kilo",
            },
          ],
        },
      });
      const expected = 150;

      expect(actual).toEqual(expected);
    });

    it("debería devolver el precio correcto cuando hay más de una unidad", () => {
      const actual: number = getCartItemPrice({
        ...item,
        options: {
          Peso: [
            {
              category: "Peso",
              id: "",
              description: "",
              image: "",
              price: 50,
              title: "Medio kilo",
            },
          ],
        },
        quantity: 2,
      });
      const expected = 300;

      expect(actual).toEqual(expected);
    });

    it("debería devolver el precio correcto cuando hay una unidad y más de una opción", () => {
      const actual: number = getCartItemPrice({
        ...item,
        options: {
          Peso: [
            {
              category: "Peso",
              id: "",
              description: "",
              image: "",
              price: 50,
              title: "Medio kilo",
            },
          ],
          Calidad: [
            {
              category: "Calidad",
              id: "",
              description: "",
              image: "",
              price: 50,
              title: "Alta",
            },
          ],
        },
      });
      const expected = 200;

      expect(actual).toEqual(expected);
    });
  });
});

describe("getCartTotal", () => {
  it("debería devolver el precio correcto cuando hay una unidad", () => {
    const actual = getCartTotal([item]);
    const expected = 100;

    expect(actual).toEqual(expected);
  });

  it("debería devolver el precio correcto cuando hay más de una unidad", () => {
    const actual = getCartTotal([item, item]);
    const expected = 200;

    expect(actual).toEqual(expected);
  });
});

describe("getCartItemOptionsSummary", () => {
  it("debería devolver el summary cuando tenemos una option", () => {
    const actual: string = getCartItemOptionsSummary({
      Peso: [
        {
          category: "Peso",
          id: "",
          description: "",
          image: "",
          price: 50,
          title: "Medio kilo",
        },
      ],
    });
    const expected = "Peso: Medio kilo";

    expect(actual).toEqual(expected);
  });

  it("debería devolver el summary cuando tenemos más de una opción", () => {
    const actual: string = getCartItemOptionsSummary({
      Peso: [
        {
          category: "Peso",
          id: "",
          description: "",
          image: "",
          price: 50,
          title: "Medio kilo",
        },
      ],
      Calidad: [
        {
          category: "Calidad",
          id: "",
          description: "",
          image: "",
          price: 50,
          title: "Alta",
        },
      ],
    });
    const expected = "Peso: Medio kilo, Calidad: Alta";

    expect(actual).toEqual(expected);
  });
});

describe("getCartMessage", () => {
  it("debería mostrar un mensaje cuando no hay options", () => {
    const actual: string = getCartMessage([item]);
    const expected = `* title - $\u00a0100,00

Total: $\u00a0100,00`;

    expect(actual).toEqual(expected);
  });

  it("debería mostrar un mensaje cuando hay options", () => {
    const actual: string = getCartMessage([
      {
        ...item,
        options: {
          Peso: [
            {
              category: "Peso",
              id: "",
              description: "",
              image: "",
              price: 50,
              title: "Medio kilo",
            },
          ],
          Calidad: [
            {
              category: "Calidad",
              id: "",
              description: "",
              image: "",
              price: 50,
              title: "Alta",
            },
          ],
        },
      },
    ]);
    const expected = `* title [Peso: Medio kilo, Calidad: Alta] - $\u00a0200,00

Total: $\u00a0200,00`;

    expect(actual).toEqual(expected);
  });
});
