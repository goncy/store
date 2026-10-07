import api from "~/product/api";

export async function generateStaticParams() {
  const products = await api.list();

  return [{product: []}, ...products.map((product) => ({product: [product.id]}))];
}

export default function ProductLayout({children}: LayoutProps<"/[[...product]]">) {
  return children;
}
