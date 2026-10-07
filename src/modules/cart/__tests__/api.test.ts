import {afterEach, beforeEach, describe, expect, it, vi} from "vitest";

import api from "../api";

vi.mock("next/cache", () => ({cacheLife: vi.fn(), cacheTag: vi.fn()}));

const csv = [
  "title,type,text,note,required",
  "Direccion de envio,text,Mi casa 123,,true",
  'Forma de pago,radio,"Efectivo, Tarjeta",,true',
  "Notas,textarea,,,false",
].join("\n");

function mockFetch(body: string, init: ResponseInit) {
  vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(body, init)));
}

describe("cart api field list", () => {
  beforeEach(() => {
    vi.stubEnv("USE_MOCKS", "false");
    vi.stubEnv("FIELDS", "https://example.com/fields.csv");
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it("debería omitir los campos con un tipo desconocido y mantener el resto", async () => {
    mockFetch(csv, {status: 200, headers: {"content-type": "text/csv"}});
    const warn = vi.spyOn(console, "warn").mockImplementation(() => undefined);

    const fields = await api.field.list();

    expect(fields).toEqual([
      {
        title: "Direccion de envio",
        placeholder: "Mi casa 123",
        required: "true",
        note: "",
        type: "text",
      },
      {
        title: "Forma de pago",
        options: ["Efectivo", "Tarjeta"],
        required: "true",
        note: "",
        type: "radio",
      },
    ]);
    expect(warn).toHaveBeenCalledExactlyOnceWith(
      'fields: skipping "Notas" with unknown type "textarea"',
    );
  });

  it("debería rechazar una respuesta con error", async () => {
    mockFetch("Internal error", {
      status: 500,
      headers: {"content-type": "text/plain"},
    });

    await expect(api.field.list()).rejects.toThrow("status 500");
  });
});
