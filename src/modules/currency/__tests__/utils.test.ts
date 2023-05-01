import {parseCurrency} from "../utils";

describe("currency", () => {
  describe("parseCurrency", () => {
    it("deberia devolver el precio localizado", () => {
      const actual = 65;
      const expected = "$\xa065,00";

      expect(parseCurrency(actual)).toEqual(expected);
    });
  });
});
