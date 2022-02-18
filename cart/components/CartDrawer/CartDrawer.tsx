import React from "react";
import {
  Text,
  Image,
  CloseButton,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  DrawerProps,
  Stack,
  IconButton,
  DrawerFooter,
  Button,
  Link,
  DrawerBody,
  Divider,
} from "@chakra-ui/react";
import {ChevronLeftIcon} from "@chakra-ui/icons";

import {useCart} from "../../context";
import {CartItem, Field} from "../../types";

import Details from "./Details";
import Fields from "./Fields";

interface Props extends Omit<DrawerProps, "children"> {
  fields: Field[];
}

const CartDrawer: React.FC<Props> = ({onClose, isOpen, fields, ...props}) => {
  const [{total, message, cart, checkout}, {removeItem, updateItem, updateField}] = useCart();
  const [currentStep, setCurrentStep] = React.useState<"details" | "fields">("details");

  function handleUpdateCart(id: symbol, item: CartItem) {
    if (!item.quantity) {
      return removeItem(id);
    }

    return updateItem(id, item);
  }

  function handleUpdateField(id: string, value: string) {
    return updateField(id, value);
  }

  React.useEffect(() => {
    if (!cart.size) {
      onClose();
    }
  }, [cart.size, onClose]);

  React.useEffect(() => {
    if (!isOpen) {
      setCurrentStep("details");
    }
  }, [isOpen]);

  return (
    <Drawer isOpen={isOpen} placement="right" size="sm" onClose={onClose} {...props}>
      <DrawerOverlay>
        <DrawerContent paddingTop={4} {...props}>
          <DrawerHeader paddingX={4}>
            <Stack alignItems="center" direction="row" justifyContent="space-between">
              <Stack alignItems="center" direction="row">
                {currentStep === "fields" && (
                  <IconButton
                    aria-label="Go back"
                    icon={<ChevronLeftIcon height={8} width={8} />}
                    size="sm"
                    variant="ghost"
                    onClick={() => setCurrentStep("details")}
                  />
                )}
                <Text fontSize={{base: "2xl", sm: "3xl"}} fontWeight="500">
                  Tu pedido
                </Text>
              </Stack>
              <CloseButton onClick={onClose} />
            </Stack>
          </DrawerHeader>
          <DrawerBody data-testid="cart" paddingX={4}>
            {currentStep === "details" && <Details cart={cart} onChange={handleUpdateCart} />}
            {currentStep === "fields" && (
              <Fields checkout={checkout} fields={fields} onChange={handleUpdateField} />
            )}
          </DrawerBody>
          <DrawerFooter paddingX={4}>
            {fields && currentStep === "details" && (
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
                  data-testid="continue-order"
                  size="lg"
                  width="100%"
                  onClick={() => setCurrentStep("fields")}
                >
                  Continuar
                </Button>
              </Stack>
            )}
            {(currentStep === "fields" || !fields) && (
              <Button
                isExternal
                as={Link}
                colorScheme="whatsapp"
                data-testid="complete-order"
                href={`https://wa.me/5491141414141?text=${encodeURIComponent(message)}`}
                leftIcon={
                  <Image src="https://icongr.am/fontawesome/whatsapp.svg?size=24&color=ffffff" />
                }
                size="lg"
                width="100%"
              >
                Completar pedido
              </Button>
            )}
          </DrawerFooter>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};

export default CartDrawer;
