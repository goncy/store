import type {Store as IStore} from "./types";

import {cacheLife, cacheTag} from "next/cache";

import {fetchCsv} from "@/lib/csv";

export default {
  fetch: async (): Promise<IStore> => {
    "use cache";

    cacheLife("max");
    cacheTag("store");

    if (process.env.USE_MOCKS === "true") {
      return import("./mocks/default.json").then((result: {default: IStore}) => result.default);
    }

    const rows = await fetchCsv<Partial<IStore>>(process.env.STORE, "store");
    const store = rows.at(0);

    // A missing first row or title means the export is not the store sheet.
    if (!store?.title) {
      throw new Error("store: missing store row or title");
    }

    return store as IStore;
  },
};
