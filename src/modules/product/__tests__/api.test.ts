import {afterEach, beforeEach, describe, expect, it, vi} from "vitest";

import api from "../api";

vi.mock("next/cache", () => ({cacheLife: vi.fn(), cacheTag: vi.fn()}));

const csv = [
  "type,id,category,title,description,image,price",
  "product,p1,Dulces,Alfajor,Rico,,100",
  "option,p1,Peso,1 KG,,,50",
].join("\n");

function mockFetch(body: string, init: ResponseInit) {
  vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(body, init)));
}

describe("product api list", () => {
  beforeEach(() => {
    vi.stubEnv("USE_MOCKS", "false");
    vi.stubEnv("PRODUCTS", "https://example.com/products.csv");
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it("debería devolver los productos de un CSV válido", async () => {
    mockFetch(csv, {status: 200, headers: {"content-type": "text/csv; charset=utf-8"}});

    const products = await api.list();

    expect(products).toHaveLength(1);
    expect(products[0]).toMatchObject({id: "p1", title: "Alfajor", price: 100});
    expect(products[0].options?.Peso).toHaveLength(1);
  });

  it("debería rechazar una respuesta con error", async () => {
    mockFetch("Internal error", {status: 500, headers: {"content-type": "text/plain"}});

    await expect(api.list()).rejects.toThrow("status 500");
  });

  it("debería rechazar un cuerpo HTML con estado 200", async () => {
    mockFetch("<!doctype html><html></html>", {
      status: 200,
      headers: {"content-type": "text/html; charset=utf-8"},
    });

    await expect(api.list()).rejects.toThrow("unexpected content type");
  });

  it("debería rechazar un CSV sin productos", async () => {
    mockFetch("type,id,title\nunknown,x,y", {status: 200, headers: {"content-type": "text/csv"}});

    await expect(api.list()).rejects.toThrow("no product rows");
  });
});
