import type {Field as IField} from "./types";

import Papa from "papaparse";
import {cacheLife, cacheTag} from "next/cache";

interface RawField {
  title: string;
  type: "radio" | "text";
  text: string;
  note: string;
  required: boolean;
}

function normalize(data: RawField[]): IField[] {
  return data.map((field) => {
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
        throw new Error("Unknown field type");
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

      return fetch(process.env.FIELDS!).then(async (response) => {
        const csv = await response.text();

        return new Promise<IField[]>((resolve, reject) => {
          Papa.parse(csv, {
            header: true,
            complete: (results) => {
              const data = normalize(results.data as RawField[]);

              return resolve(data);
            },
            error: (error: Error) => reject(error.message),
          });
        });
      });
    },
  },
};
