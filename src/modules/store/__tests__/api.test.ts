import {afterEach, beforeEach, describe, expect, it, vi} from "vitest";

import api from "../api";

vi.mock("next/cache", () => ({cacheLife: vi.fn(), cacheTag: vi.fn()}));

function mockFetch(body: string, init: ResponseInit) {
  vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(body, init)));
}

describe("store api fetch", () => {
  beforeEach(() => {
    vi.stubEnv("USE_MOCKS", "false");
    vi.stubEnv("STORE", "https://example.com/store.csv");
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it("debería devolver la tienda de un CSV válido", async () => {
    mockFetch("title,subtitle,phone\nMi tienda,La mejor,123", {
      status: 200,
      headers: {"content-type": "text/csv"},
    });

    await expect(api.fetch()).resolves.toMatchObject({title: "Mi tienda", phone: "123"});
  });

  it("debería rechazar una respuesta con error", async () => {
    mockFetch("Internal error", {status: 500, headers: {"content-type": "text/plain"}});

    await expect(api.fetch()).rejects.toThrow("status 500");
  });

  it("debería rechazar un cuerpo HTML con estado 200", async () => {
    mockFetch("<!doctype html><html></html>", {
      status: 200,
      headers: {"content-type": "text/html"},
    });

    await expect(api.fetch()).rejects.toThrow("unexpected content type");
  });

  it("debería rechazar un CSV sin título", async () => {
    mockFetch("subtitle,phone\nLa mejor,123", {status: 200, headers: {"content-type": "text/csv"}});

    await expect(api.fetch()).rejects.toThrow('store: row 2 has an empty "title" column');
  });

  it("debería rechazar un CSV sin filas", async () => {
    mockFetch("title,subtitle,phone", {status: 200, headers: {"content-type": "text/csv"}});

    await expect(api.fetch()).rejects.toThrow("store: the sheet has no data rows");
  });
});
