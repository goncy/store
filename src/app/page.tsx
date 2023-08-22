import productApi from "~/product/api";
import cartApi from "~/cart/api";
import storeApi from "~/store/api";
import StoreScreen from "~/store/screens/Store";

const IndexRoute = async () => {
  const products = await productApi.list();
  const fields = await cartApi.list();
  const store = await storeApi.fetch();

  return <StoreScreen fields={fields} products={products} store={store} />;
};

export default IndexRoute;
