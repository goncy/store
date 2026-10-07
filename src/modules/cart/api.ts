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
  return data.flatMap((field): IField[] => {
    switch (field.type) {
      case "radio":
        return [
          {
            title: field.title,
            options: field.text.split(",").map((option) => option.trim()),
            required: field.required,
            note: field.note || "",
            type: "radio",
          },
        ];

      case "text":
        return [
          {
            title: field.title,
            placeholder: field.text,
            required: field.required,
            note: field.note || "",
            type: "text",
          },
        ];

      default: {
        console.warn(`fields: skipping "${field.title}" with unknown type "${field.type}"`);

        return [];
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
