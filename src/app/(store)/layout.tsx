import api from "~/product/api";

import PageClient from "./[[...product]]/page.client";

// The list lives above the catch-all so `/` and every `/[product]` share one list instance
// and one prefetched copy of the catalog. Routes added to `(store)` inherit the list.
export default async function StoreLayout({children}: {children: React.ReactNode}) {
  const products = await api.list();

  return (
    <>
      <PageClient products={products} />
      {children}
    </>
  );
}
