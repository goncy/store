import {Suspense} from "react";

import api from "~/product/api";

export async function generateStaticParams() {
  const products = await api.list();

  return [{product: []}, ...products.map((product) => ({product: [product.id]}))];
}

export default function StoreLayout({children, selection}: LayoutProps<"/[[...product]]">) {
  return (
    <>
      {children}
      <Suspense fallback={null}>{selection}</Suspense>
    </>
  );
}
