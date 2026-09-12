import api from "~/product/api";

import PageClient from "./page.client";

async function StorePage() {
  const products = await api.list();

  return <PageClient products={products} />;
}

export default StorePage;
