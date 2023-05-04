import productApi from "~/product/api";
import cartApi from "~/cart/api";
import StoreScreen from "~/product/screens/Store";
import CartProvider from "~/cart/context";
import {groupByCategory} from "~/product/utils";

const IndexMockRoute = async ({
  params: {mock},
}: {
  params: {
    mock: string;
  };
}) => {
  const products = await productApi.mock.list(mock);
  const fields = await cartApi.mock.list(mock);
  const categories = groupByCategory(products);

  return (
    <CartProvider fields={fields}>
      <StoreScreen categories={categories} fields={fields} />
    </CartProvider>
  );
};

export default IndexMockRoute;
