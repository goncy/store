import api from "~/product/api";

import ProductPageClient from "./client";

export async function generateStaticParams() {
  const products = await api.list();

  return products.map((product) => ({product: product.id}));
}

const ProductPage = async ({params: {product}}: {params: {product: string}}) => {
  const data = await api.fetch(product);

  return <ProductPageClient product={data} />;
};

export default ProductPage;
