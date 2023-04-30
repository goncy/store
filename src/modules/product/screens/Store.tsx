"use client";

import type {Product} from "../types";

import {useState} from "react";
import {Button, Flex, Grid, Stack, Text} from "@chakra-ui/react";

import type {Field} from "~/cart/types";
import CartDrawer from "~/cart/components/CartDrawer/CartDrawer";
import {useCart} from "~/cart/context";

import ProductCard from "../components/ProductCard";

function StoreScreen({products, fields}: {products: Product[]; fields: Field[]}) {
  const [{total, quantity}, {addItem}] = useCart();
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

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
              <ProductCard
                key={product.id}
                product={product}
                onAdd={(_product: Product) => addItem(Symbol(), {..._product, quantity: 1})}
              />
            ))}
          </Grid>
        ) : (
          <Text color="gray.500" fontSize="lg" margin="auto">
            No hay productos
          </Text>
        )}
        {Boolean(quantity) && (
          <Flex alignItems="center" bottom={4} justifyContent="center" position="sticky">
            <Button
              boxShadow="xl"
              colorScheme="primary"
              data-testid="show-cart"
              size="lg"
              width={{base: "100%", sm: "fit-content"}}
              onClick={() => setIsCartOpen(true)}
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
      <CartDrawer fields={fields} isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}

export default StoreScreen;
