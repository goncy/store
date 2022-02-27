import {ParsedUrlQuery} from "querystring";

import * as React from "react";
import {GetStaticPaths, GetStaticProps} from "next";

import {Product} from "../product/types";
import productApi from "../product/api";
import cartApi from "../cart/api";
import StoreScreen from "../product/screens/Store";
import {Field} from "../cart/types";
import CartProvider from "../cart/context";

interface Props {
  products: Product[];
  fields: Field[];
}

interface Params extends ParsedUrlQuery {
  mock: string;
}

const IndexRoute: React.FC<Props> = ({products, fields}) => {
  return (
    <CartProvider fields={fields}>
      <StoreScreen fields={fields} products={products} />
    </CartProvider>
  );
};

export const getStaticProps: GetStaticProps<unknown, Params> = async ({params}) => {
  const products = await productApi.mock.list(params.mock);
  const fields = await cartApi.mock.list(params.mock);

  return {
    props: {
      products,
      fields,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: process.env.NODE_ENV === "production" ? false : "blocking",
  };
};

export default IndexRoute;
