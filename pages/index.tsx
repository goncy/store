import * as React from "react";
import {GetStaticProps} from "next";

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

const IndexRoute: React.FC<Props> = ({products, fields}) => {
  return (
    <CartProvider fields={fields}>
      <StoreScreen fields={fields} products={products} />
    </CartProvider>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const products = await productApi.list();
  const fields = await cartApi.list();

  return {
    props: {
      products,
      fields,
    },
  };
};

export default IndexRoute;
