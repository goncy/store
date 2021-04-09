import React from "react";
import {Stack, Button, Text} from "@chakra-ui/react";

import {parseCurrency} from "../../utils/currency";
import {Product} from "../types";

interface Props {
  product: Product;
  onAdd: (product: Product) => void;
}

const ProductCard: React.FC<Props> = ({product, onAdd}) => {
  return (
    <Stack
      key={product.id}
      backgroundColor="gray.100"
      borderRadius="md"
      data-test-id="product"
      padding={4}
      spacing={3}
    >
      <Stack spacing={1}>
        <Text>{product.title}</Text>
        <Text color="green.500" fontSize="sm" fontWeight="500">
          {parseCurrency(product.price)}
        </Text>
      </Stack>
      <Button colorScheme="primary" size="sm" variant="outline" onClick={() => onAdd(product)}>
        Agregar
      </Button>
    </Stack>
  );
};

export default ProductCard;
