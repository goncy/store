import api from "~/product/api";

import DefaultClient from "./default.client";

export default async function Default() {
  const products = await api.list();

  return <DefaultClient products={products} />;
}
