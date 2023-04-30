import React from "react";
import {Stack, Button, Text, Image} from "@chakra-ui/react";

import {parseCurrency} from "../../utils/currency";
import {CartItem} from "../../cart/types";
import {Product} from "../types";
import CartItemDrawer from "../../cart/components/CartItemDrawer";

interface Props {
  product: Product;
  onAdd: (product: Product) => void;
}

const ProductCard: React.FC<Props> = ({product, onAdd}) => {
  const [isModalOpen, toggleModal] = React.useState(false);
  const cartItem = React.useMemo<CartItem>(() => ({...product, quantity: 1}), [product]);

  return (
    <>
      <Stack
        key={product.id}
        alignItems="center"
        borderColor="gray.100"
        borderRadius="md"
        borderWidth={1}
        data-testid="product"
        direction="row"
        justifyContent="space-between"
        spacing={3}
      >
        <Stack direction="row" padding={2} spacing={4} width="100%">
          <Image
            backgroundColor="white"
            borderRadius="md"
            height={{base: 24, sm: 36}}
            loading="lazy"
            minWidth={{base: 24, sm: 36}}
            objectFit="contain"
            src={product.image}
            width={{base: 24, sm: 36}}
          />
          <Stack justifyContent="space-between" spacing={1} width="100%">
            <Stack spacing={1}>
              <Text fontWeight="500">{product.title}</Text>
              <Text color="gray.500" fontSize="sm">
                {product.description}
              </Text>
            </Stack>
            <Stack alignItems="flex-end" direction="row" justifyContent="space-between">
              <Text color="green.500" fontSize="sm" fontWeight="500">
                {parseCurrency(product.price)}
              </Text>
              <Button
                size="xs"
                onClick={() => (product.options ? toggleModal(true) : onAdd(cartItem))}
              >
                Agregar
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      {isModalOpen && (
        <CartItemDrawer
          isOpen
          item={cartItem}
          onClose={() => toggleModal(false)}
          onSubmit={(item: CartItem) => {
            onAdd(item);
            toggleModal(false);
          }}
        />
      )}
    </>
  );
};

export default ProductCard;
