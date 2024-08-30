import type {Field as IField, RadioField, TextField} from "./types";

import Papa from "papaparse";

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
        } as RadioField;

      case "text":
        return {
          title: field.title,
          placeholder: field.text,
          required: field.required,
          note: field.note || "",
          type: "text",
        } as TextField;

      default: {
        throw new Error("Unknown field type");
      }
    }
  }, []);
}

export default {
  field: {
    list: async (): Promise<IField[]> => {
      return fetch(process.env.FIELDS!, {next: {tags: ["fields"]}}).then(async (response) => {
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
  mock: {
    list: (mock: string): Promise<IField[]> =>
      import(`./mocks/${mock}.json`).then((result: {default: RawField[]}) =>
        normalize(result.default),
      ),
  },
};
