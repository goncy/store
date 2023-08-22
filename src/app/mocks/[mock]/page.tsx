import api from "~/product/api";
import StoreScreen from "~/store/screens/Store";

const IndexMockPage = async ({
  params: {mock},
}: {
  params: {
    mock: string;
  };
}) => {
  const products = await api.mock.list(mock);

  return <StoreScreen products={products} />;
};

export default IndexMockPage;
