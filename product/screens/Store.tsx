import * as React from "react";
import {Button, Flex, Grid, Stack, Text} from "@chakra-ui/react";

import type {CartItem} from "../../cart/types";
import type {Product} from "../types";
import ProductCard from "../components/ProductCard";
import CartDrawer from "../../cart/components/CartDrawer";
import {parseCurrency} from "../../utils/currency";
import {getCartTotal} from "../../cart/utils";

interface Props {
  products: Product[];
}

const StoreScreen: React.FC<Props> = ({products}) => {
  const [cart, setCart] = React.useState<CartItem[]>([]);
  const [isCartOpen, toggleCart] = React.useState<boolean>(false);

  const total = React.useMemo(() => parseCurrency(getCartTotal(cart)), [cart]);
  const quantity = React.useMemo(() => cart.reduce((acc, item) => acc + item.quantity, 0), [cart]);

  function handleAddToCart(item: CartItem) {
    setCart((cart) => [...cart, {...item, id: String(+new Date())}]);
  }

  function handleIncrementCartItem(item: CartItem) {
    setCart((cart) => {
      return cart.reduce((acc, _item) => {
        if (item.id !== _item.id) {
          return acc.concat(_item);
        }

        return acc.concat({..._item, quantity: _item.quantity + 1});
      }, []);
    });
  }

  function handleDecrementCartItem(item: CartItem) {
    setCart((cart) => {
      return cart.reduce((acc, _item) => {
        if (item.id !== _item.id) {
          return acc.concat(_item);
        }

        if (_item.quantity === 1) {
          return acc;
        }

        return acc.concat({..._item, quantity: _item.quantity - 1});
      }, []);
    });
  }

  return (
    <>
      <Stack spacing={6}>
        {products.length ? (
          <Grid
            gridGap={8}
            templateColumns={{
              base: "repeat(auto-fill, minmax(240px, 1fr))",
              sm: "repeat(auto-fill, minmax(360px, 1fr))",
            }}
          >
            {products.map((product) => (
              <ProductCard key={product.id} product={product} onAdd={handleAddToCart} />
            ))}
          </Grid>
        ) : (
          <Text color="gray.500" fontSize="lg" margin="auto">
            No hay productos
          </Text>
        )}
        {Boolean(cart.length) && (
          <Flex alignItems="center" bottom={4} justifyContent="center" position="sticky">
            <Button
              boxShadow="xl"
              colorScheme="primary"
              data-testid="show-cart"
              size="lg"
              width={{base: "100%", sm: "fit-content"}}
              onClick={() => toggleCart(true)}
            >
              <Stack alignItems="center" direction="row" spacing={6}>
                <Stack alignItems="center" direction="row" spacing={3}>
                  <Text fontSize="md" lineHeight={6}>
                    Ver pedido
                  </Text>
                  <Text
                    backgroundColor="rgba(0,0,0,0.25)"
                    borderRadius="sm"
                    color="gray.100"
                    fontSize="xs"
                    fontWeight="500"
                    paddingX={2}
                    paddingY={1}
                  >
                    {quantity} items
                  </Text>
                </Stack>
                <Text fontSize="md" lineHeight={6}>
                  {total}
                </Text>
              </Stack>
            </Button>
          </Flex>
        )}
      </Stack>
      <CartDrawer
        isOpen={isCartOpen}
        items={cart}
        onClose={() => toggleCart(false)}
        onDecrement={handleDecrementCartItem}
        onIncrement={handleIncrementCartItem}
      />
    </>
  );
};

export default StoreScreen;
