import api from "~/product/api";

import LayoutClient from "./layout.client";

export default async function StoreLayout({children}: {children: React.ReactNode}) {
  const products = await api.list();

  return (
    <>
      <LayoutClient products={products} />
      {children}
    </>
  );
}
