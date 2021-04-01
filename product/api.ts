import axios from "axios";
import Papa from "papaparse";

import {Product} from "./types";

export default {
  list: async (): Promise<Product[]> => {
    return axios
      .get(
        `https://docs.google.com/spreadsheets/d/e/2PACX-1vSk6SRbveAHR5DVL_DoFCMXNNMV37BD-J-GzY9i8u246Gwiv5MstNkRSRi2VJNln3W5PaIduadgiRg2/pub?output=csv`,
        {
          responseType: "blob",
        },
      )
      .then(
        (response) =>
          new Promise<Product[]>((resolve, reject) => {
            Papa.parse(response.data, {
              header: true,
              complete: (results) => {
                const products = results.data as Product[];

                return resolve(
                  products.map((product) => ({
                    ...product,
                    price: Number(product.price),
                  })),
                );
              },
              error: (error) => reject(error.message),
            });
          }),
      );
  },
};
