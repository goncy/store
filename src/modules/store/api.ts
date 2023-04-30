import axios from "axios";
import Papa from "papaparse";

import {Store as IStore} from "./types";

export default {
  fetch: async (): Promise<IStore> => {
    return axios
      .get(process.env.STORE_CSV, {
        responseType: "blob",
      })
      .then(
        (response) =>
          new Promise<IStore>((resolve, reject) => {
            Papa.parse(response.data, {
              header: true,
              complete: (results) => {
                return resolve(results.data[0] as IStore);
              },
              error: (error) => reject(error.message),
            });
          }),
      );
  },
  mock: {
    fetch: (mock: string): Promise<IStore> =>
      import(`./mocks/${mock}.json`).then((result) => result.default as Promise<IStore>),
  },
};
