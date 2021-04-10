import React from "react";
import {Stack, Button, Text, Image} from "@chakra-ui/react";

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
      borderColor="gray.100"
      borderRadius="md"
      borderWidth={1}
      boxShadow="md"
      data-testid="product"
      padding={4}
      spacing={3}
    >
      <Stack direction="row">
        <Image
          backgroundColor="white"
          borderRadius="md"
          height={16}
          loading="lazy"
          objectFit="contain"
          src={product.image}
          width={16}
        />
        <Stack spacing={1}>
          <Text>{product.title}</Text>
          <Text color="green.500" fontSize="sm" fontWeight="500">
            {parseCurrency(product.price)}
          </Text>
        </Stack>
      </Stack>
      <Button colorScheme="primary" size="sm" variant="outline" onClick={() => onAdd(product)}>
        Agregar
      </Button>
    </Stack>
  );
};

export default ProductCard;
