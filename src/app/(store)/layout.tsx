import api from "~/product/api";

import Listing from "./listing";

export default async function StoreLayout({children}: {children: React.ReactNode}) {
  const products = await api.list();

  return (
    <>
      <Listing products={products} />
      {children}
    </>
  );
}
