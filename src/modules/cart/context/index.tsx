import type {Field} from "../types";

import storeApi from "~/store/api";

import cartApi from "../api";

import CartProviderClient from "./client";

async function getFields(): Promise<Field[]> {
  try {
    return await cartApi.field.list();
  } catch (error) {
    // Extra checkout fields are optional: render the cart without them instead of failing every route.
    // eslint-disable-next-line no-console
    console.error("Could not load cart fields, rendering cart without them", error);

    return [];
  }
}

async function CartProvider({children}: {children: React.ReactNode}) {
  const fields = await getFields();
  const store = await storeApi.fetch();

  return (
    <CartProviderClient fields={fields} store={store}>
      {children}
    </CartProviderClient>
  );
}

export default CartProvider;
