import type {Metadata} from "next";

import api from "~/product/api";

import ProductDrawer from "./drawer.client";

export async function generateMetadata({
  params,
}: PageProps<"/[[...product]]">): Promise<Metadata | undefined> {
  const {product: segments} = await params;

  if (!segments) return;

  const product = await api.fetch(segments[0]);

  return {
    title: product.title,
    description: product.description,
  };
}

// Only the selected product reaches the client; the list is rendered by the `(store)` layout.
// `api.fetch` runs outside Suspense so unknown ids respond with a 404 status.
export default async function Page({params}: PageProps<"/[[...product]]">) {
  const {product: segments} = await params;

  if (!segments) return null;

  const product = await api.fetch(segments[0]);

  return <ProductDrawer product={product} />;
}
