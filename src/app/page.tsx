import productApi from "../product/api";
import cartApi from "../cart/api";
import StoreScreen from "../product/screens/Store";
import CartProvider from "../cart/context";

const IndexRoute = async () => {
  const products = await productApi.list();
  const fields = await cartApi.list();

  return (
    <CartProvider fields={fields}>
      <StoreScreen fields={fields} products={products} />
    </CartProvider>
  );
};

export default IndexRoute;
