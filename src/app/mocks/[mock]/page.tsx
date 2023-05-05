import productApi from "~/product/api";
import cartApi from "~/cart/api";
import storeApi from "~/store/api";
import StoreScreen from "~/store/screens/Store";
import CartProvider from "~/cart/context";

const IndexMockRoute = async ({
  params: {mock},
}: {
  params: {
    mock: string;
  };
}) => {
  const products = await productApi.mock.list(mock);
  const store = await storeApi.mock.fetch(mock);
  const fields = await cartApi.mock.list(mock);

  return (
    <CartProvider fields={fields}>
      <StoreScreen fields={fields} products={products} store={store} />
    </CartProvider>
  );
};

export default IndexMockRoute;
