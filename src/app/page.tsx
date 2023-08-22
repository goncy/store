import api from "~/product/api";
import StoreScreen from "~/store/screens/Store";

const IndexRoute = async () => {
  const products = await api.list();

  return <StoreScreen products={products} />;
};

export default IndexRoute;
