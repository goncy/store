import type {Store as IStore} from "./types";

import Papa from "papaparse";
import {cacheLife, cacheTag} from "next/cache";

export default {
  fetch: async (): Promise<IStore> => {
    "use cache";

    cacheLife("max");
    cacheTag("store");

    if (process.env.USE_MOCKS === "true") {
      return import("./mocks/default.json").then((result: {default: IStore}) => result.default);
    }

    return fetch(process.env.STORE!).then(async (response) => {
      const csv = await response.text();

      return new Promise<IStore>((resolve, reject) => {
        Papa.parse(csv, {
          header: true,
          complete: (results) => {
            return resolve(results.data[0] as IStore);
          },
          error: (error: Error) => reject(error.message),
        });
      });
    });
  },
};
