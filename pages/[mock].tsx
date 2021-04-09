import {ParsedUrlQuery} from "querystring";

import * as React from "react";
import {GetStaticPaths, GetStaticProps} from "next";

import {Product} from "../product/types";
import api from "../product/api";
import StoreScreen from "../product/screens/Store";

interface Props {
  products: Product[];
}

interface Params extends ParsedUrlQuery {
  mock: string;
}

const IndexRoute: React.FC<Props> = ({products}) => {
  return <StoreScreen products={products} />;
};

export const getStaticProps: GetStaticProps<unknown, Params> = async ({params}) => {
  const products = await api.mock.list(params.mock);

  return {
    revalidate: 10,
    props: {
      products,
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
