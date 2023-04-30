import productApi from "~/product/api";
import cartApi from "~/cart/api";
import StoreScreen from "~/product/screens/Store";
import CartProvider from "~/cart/context";

const IndexMockRoute = async ({
  params: {mock},
}: {
  params: {
    mock: string;
  };
}) => {
  const products = await productApi.mock.list(mock);
  const fields = await cartApi.mock.list(mock);

  return (
    <CartProvider fields={fields}>
      <StoreScreen fields={fields} products={products} />
    </CartProvider>
  );
};

export default IndexMockRoute;
