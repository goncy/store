import type {Metadata} from "next";

import api from "~/product/api";

import PageClient from "./page.client";

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

export default async function Page({params}: PageProps<"/[[...product]]">) {
  const {product: segments} = await params;

  if (!segments) return null;

  const product = await api.fetch(segments[0]);

  return <PageClient product={product} />;
}
