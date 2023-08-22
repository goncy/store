import api from "~/product/api";

import ProductPageClient from "./client";

const ProductPage = async ({params: {product}}: {params: {product: string}}) => {
  const data = await api.fetch(product);

  return <ProductPageClient product={data} />;
};

export default ProductPage;
