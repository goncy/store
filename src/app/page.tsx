import productApi from "~/product/api";
import cartApi from "~/cart/api";
import StoreScreen from "~/product/screens/Store";
import CartProvider from "~/cart/context";
import {groupByCategory} from "~/product/utils";

const IndexRoute = async () => {
  const products = await productApi.list();
  const fields = await cartApi.list();
  const categories = groupByCategory(products);

  return (
    <CartProvider fields={fields}>
      <StoreScreen categories={categories} fields={fields} />
    </CartProvider>
  );
};

export default IndexRoute;
