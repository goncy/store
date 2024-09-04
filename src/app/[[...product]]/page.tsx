import type {Metadata} from "next";

import api from "~/product/api";

import StoreScreen from "@/modules/store/screens/Store";

export const dynamic = "force-static";

export async function generateStaticParams() {
  const products = await api.list();

  // Build index for the home page and then for each product
  return [{}].concat(products.map((product) => ({product: [product.id]}))) as Record<
    string,
    string[]
  >[];
}

export async function generateMetadata({
  params,
}: {
  params: {product?: string[]};
}): Promise<Metadata | undefined> {
  if (params.product) {
    const product = await api.fetch(params.product[0]);

    return {
      title: product.title,
      description: product.description,
    };
  }
}

async function HomeAndProductPage({params}: {params: {product?: [product: string]}}) {
  const products = await api.list();
  const selected = params.product ? await api.fetch(params.product[0]) : null;

  return <StoreScreen products={products} selected={selected} />;
}

export default HomeAndProductPage;
