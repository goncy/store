import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  CloseButton,
  DrawerHeader,
  DrawerBody,
  Stack,
  Divider,
  Button,
  DrawerFooter,
  DrawerProps,
  Text,
  Image,
  List,
  ListItem,
} from "@chakra-ui/react";
import React from "react";

import {parseCurrency} from "../../utils/currency";
import {Option} from "../../product/types";
import {CartItem} from "../types";
import {getCartItemPrice} from "../utils";

interface Props extends Omit<DrawerProps, "children"> {
  item: CartItem;
  onClose: VoidFunction;
  onSubmit: (item: CartItem) => void;
}

const CartItemDrawer: React.FC<Props> = ({item, onClose, onSubmit, ...props}) => {
  const [formData, setFormData] = React.useState<CartItem>(() => ({...item, options: {}}));
  const total = React.useMemo(() => parseCurrency(getCartItemPrice(formData)), [formData]);
  const options = React.useMemo(
    () => Object.entries(item.options).map(([title, options]) => ({title, options})),
    [item],
  );
  const isValid = React.useMemo(() => options.length === Object.keys(formData.options).length, [
    formData,
    options,
  ]);

  function handleSelectOption(option: Option) {
    setFormData((formData) => ({
      ...formData,
      options: {...formData.options, [option.category]: [option]},
    }));
  }

  return (
    <Drawer placement="right" size="sm" onClose={onClose} {...props}>
      <DrawerOverlay>
        <DrawerContent paddingTop={4}>
          <DrawerHeader paddingX={4}>
            <Stack alignItems="center" direction="row" justifyContent="space-between">
              <Text fontSize={{base: "2xl", sm: "3xl"}} fontWeight="500">
                {item.title}
              </Text>
              <CloseButton onClick={onClose} />
            </Stack>
          </DrawerHeader>

          <DrawerBody data-testid="cart-item-drawer" paddingX={4}>
            <Stack divider={<Divider />} spacing={6}>
              <Stack>
                <Image
                  alt={item.title}
                  height={240}
                  objectFit="cover"
                  src={item.image}
                  width="100%"
                />
                <Text color="gray.500">{item.description}</Text>
              </Stack>
              {options.length ? (
                <Stack divider={<Divider />} spacing={4}>
                  {options.map((category) => (
                    <Stack key={category.title} width="100%">
                      <Text fontSize="xl" fontWeight="500">
                        {category.title}
                      </Text>
                      <List spacing={2}>
                        {category.options.map((option) => (
                          <ListItem
                            key={option.title}
                            borderColor={
                              formData.options?.[option.category]?.[0]?.title === option.title
                                ? "primary.500"
                                : "transparent"
                            }
                            borderRadius="md"
                            borderWidth={2}
                            cursor="pointer"
                            padding={4}
                            onClick={() => handleSelectOption(option)}
                          >
                            <Stack direction="row" justifyContent="space-between" width="100%">
                              <Text>{option.title}</Text>
                              {Boolean(option.price) && (
                                <Text fontWeight="500">{parseCurrency(option.price)}</Text>
                              )}
                            </Stack>
                          </ListItem>
                        ))}
                      </List>
                    </Stack>
                  ))}
                </Stack>
              ) : (
                <Text color="gray.400">No hay elementos en tu carrito</Text>
              )}
            </Stack>
          </DrawerBody>

          <DrawerFooter paddingX={4}>
            <Stack spacing={4} width="100%">
              <Divider />
              <Stack
                alignItems="center"
                direction="row"
                fontSize="lg"
                fontWeight="500"
                justifyContent="space-between"
              >
                <Text>Total</Text>
                <Text>{total}</Text>
              </Stack>
              <Button
                colorScheme="primary"
                isDisabled={!isValid}
                size="lg"
                width="100%"
                onClick={() => onSubmit(formData)}
              >
                Agregar al pedido
              </Button>
            </Stack>
          </DrawerFooter>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};

export default CartItemDrawer;
