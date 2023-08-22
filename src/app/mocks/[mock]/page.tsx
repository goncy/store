import productApi from "~/product/api";
import cartApi from "~/cart/api";
import storeApi from "~/store/api";
import StoreScreen from "~/store/screens/Store";

const IndexMockPage = async ({
  params: {mock},
}: {
  params: {
    mock: string;
  };
}) => {
  const products = await productApi.mock.list(mock);
  const store = await storeApi.mock.fetch(mock);
  const fields = await cartApi.mock.list(mock);

  return <StoreScreen fields={fields} products={products} store={store} />;
};

export default IndexMockPage;
