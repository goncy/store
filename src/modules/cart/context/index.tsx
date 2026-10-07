import storeApi from "~/store/api";

import cartApi from "../api";

import CartProviderClient from "./client";

async function CartProvider({children}: {children: React.ReactNode}) {
  const [fields, store] = await Promise.all([cartApi.field.list(), storeApi.fetch()]);

  return (
    <CartProviderClient fields={fields} store={store}>
      {children}
    </CartProviderClient>
  );
}

export default CartProvider;
