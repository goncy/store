import api from "~/cart/api";

import CartProviderClient from "./client";

const CartProvider = async ({children}: {children: React.ReactNode}) => {
  const fields = await api.list();

  return <CartProviderClient fields={fields}>{children}</CartProviderClient>;
};

export default CartProvider;
