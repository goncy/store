import {Stack, Divider, Button, Text} from "@chakra-ui/react";
import React from "react";

import {parseCurrency} from "../../../utils/currency";
import {Cart, CartItem} from "../../types";
import {getCartItemPrice, getCartItemOptionsSummary} from "../../utils";

interface Props {
  cart: Cart;
  onChange: (id: symbol, item: CartItem) => void;
}

const Details: React.FC<Props> = ({cart, onChange}) => {
  return (
    <Stack divider={<Divider />} spacing={4}>
      {Array.from(cart.entries()).map(([id, item]) => (
        <Stack key={id.toString()} data-testid={`cart-item-${item.id}`} direction="row">
          <Stack width="100%">
            <Stack alignItems="flex-start" direction="row" justifyContent="space-between">
              <Stack spacing={0}>
                <Text fontSize="lg" fontWeight="500">
                  {item.title}
                </Text>
                {Boolean(item.options) && (
                  <Text color="gray.500">{getCartItemOptionsSummary(item.options)}</Text>
                )}
              </Stack>
              <Text fontWeight="500">{parseCurrency(getCartItemPrice(item))}</Text>
            </Stack>
            <Stack direction="row">
              <Button
                borderRadius={9999}
                colorScheme="primary"
                data-testid="decrement"
                size="xs"
                onClick={() => onChange(id, {...item, quantity: item.quantity - 1})}
              >
                {" "}
                -{" "}
              </Button>
              <Text data-testid="quantity" fontWeight="500">
                {item.quantity}
              </Text>
              <Button
                borderRadius={9999}
                colorScheme="primary"
                data-testid="increment"
                size="xs"
                onClick={() => onChange(id, {...item, quantity: item.quantity + 1})}
              >
                {" "}
                +{" "}
              </Button>
            </Stack>
          </Stack>
        </Stack>
      ))}
    </Stack>
  );
};

export default Details;
