import productApi from "~/product/api";
import cartApi from "~/cart/api";
import storeApi from "~/store/api";
import CartProvider from "~/cart/context";
import StoreScreen from "~/store/screens/Store";

const IndexRoute = async () => {
  const products = await productApi.list();
  const fields = await cartApi.list();
  const store = await storeApi.fetch();

  return (
    <CartProvider fields={fields}>
      <StoreScreen fields={fields} products={products} store={store} />
    </CartProvider>
  );
};

export default IndexRoute;
