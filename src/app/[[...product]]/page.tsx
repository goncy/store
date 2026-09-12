import type {Metadata} from "next";

import {Suspense} from "react";

import api from "~/product/api";

import StoreScreen from "@/modules/store/screens/Store";
import ProductSelection from "@/modules/product/components/ProductSelection";

type Props = Pick<PageProps<"/[[...product]]">, "params">;

export async function generateStaticParams() {
  const products = await api.list();

  return [
    // Build index for the home page...
    {product: []},
    // ...and for each product
    ...products.map((product) => ({product: [product.id]})),
  ];
}

export async function generateMetadata({params}: Props): Promise<Metadata | undefined> {
  const {product: segments} = await params;

  if (!segments) return;

  const product = await api.fetch(segments[0]);

  return {
    title: product.title,
    description: product.description,
  };
}

async function SelectedProduct({params}: Props) {
  const {product: segments} = await params;

  if (!segments) return null;

  const product = await api.fetch(segments[0]);

  return <ProductSelection product={product} />;
}

async function HomeAndProductPage({params}: Props) {
  const products = await api.list();

  return (
    <>
      <StoreScreen products={products} />
      <Suspense fallback={null}>
        <SelectedProduct params={params} />
      </Suspense>
    </>
  );
}

export default HomeAndProductPage;
