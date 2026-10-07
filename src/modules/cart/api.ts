import type {Field as IField} from "./types";

import {cacheLife, cacheTag} from "next/cache";

import {fetchCsv} from "~/utils/csv";

interface RawField {
  title: string;
  type: string;
  text: string;
  note: string;
  required: boolean;
}

function normalize(data: RawField[]): IField[] {
  return data.map((field, index) => {
    switch (field.type) {
      case "radio":
        return {
          title: field.title,
          options: field.text.split(",").map((option) => option.trim()),
          required: field.required,
          note: field.note || "",
          type: "radio",
        };

      case "text":
        return {
          title: field.title,
          placeholder: field.text,
          required: field.required,
          note: field.note || "",
          type: "text",
        };

      default: {
        throw new Error(
          `fields: row ${String(index + 2)} ("${field.title}") has unknown type "${field.type}", expected "radio" or "text"`,
        );
      }
    }
  });
}

export default {
  field: {
    list: async (): Promise<IField[]> => {
      "use cache";

      cacheLife("max");
      cacheTag("fields");

      if (process.env.USE_MOCKS === "true") {
        return import("./mocks/default.json").then((result) =>
          normalize(result.default as RawField[]),
        );
      }

      const rows = await fetchCsv<RawField>(process.env.FIELDS, "fields");

      return normalize(rows);
    },
  },
};
