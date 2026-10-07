import {afterEach, describe, expect, it, vi} from "vitest";

import storeApi from "~/store/api";
import storeMock from "~/store/mocks/default.json";

import cartApi from "../../api";
import CartProvider from "..";
import CartProviderClient from "../client";

vi.mock("next/cache", () => ({cacheLife: vi.fn(), cacheTag: vi.fn()}));

describe("CartProvider", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("debería mostrar el carrito sin campos cuando fallan los campos", async () => {
    vi.spyOn(cartApi.field, "list").mockRejectedValue(new Error("fields: status 500"));
    vi.spyOn(storeApi, "fetch").mockResolvedValue(storeMock);
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => undefined);

    const element = await CartProvider({children: "contenido"});

    expect(element.type).toBe(CartProviderClient);
    expect(element.props).toMatchObject({fields: [], store: storeMock, children: "contenido"});
    expect(consoleError).toHaveBeenCalledOnce();
  });
});
