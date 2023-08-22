import type {Metadata} from "next";

import api from "~/product/api";

import ProductPageClient from "./client";

export async function generateStaticParams() {
  const products = await api.list();

  return products.map((product) => ({product: product.id}));
}

export async function generateMetadata({
  params: {product: productId},
}: {
  params: {product: string};
}): Promise<Metadata> {
  const product = await api.fetch(productId);

  return {
    title: product.title,
    description: product.description,
  };
}

const ProductPage = async ({params: {product}}: {params: {product: string}}) => {
  const data = await api.fetch(product);

  return <ProductPageClient product={data} />;
};

export default ProductPage;
