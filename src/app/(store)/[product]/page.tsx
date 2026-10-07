import type {Metadata} from "next";

import api from "~/product/api";

import PageClient from "./page.client";

export async function generateStaticParams() {
  const products = await api.list();

  return products.map((product) => ({product: product.id}));
}

export async function generateMetadata({params}: PageProps<"/[product]">): Promise<Metadata> {
  const {product: id} = await params;
  const product = await api.fetch(id);

  return {
    title: product.title,
    description: product.description,
  };
}

// Only the selected product reaches the client; the list is rendered by the `@content` slot.
// `api.fetch` runs outside Suspense so unknown ids respond with a 404 status.
export default async function Page({params}: PageProps<"/[product]">) {
  const {product: id} = await params;
  const product = await api.fetch(id);

  return <PageClient product={product} />;
}
