import type {DrawerProps} from "@chakra-ui/react";
import type {CartItem, Field} from "../../types";

import React from "react";
import {
  CloseButton,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  DrawerFooter,
  Button,
  DrawerBody,
} from "@chakra-ui/react";
import {ChevronLeftIcon} from "@chakra-ui/icons";

import {useCart} from "../../context";

import Details from "./Details";
import Fields from "./Fields";

function CartDrawer({
  onClose,
  isOpen,
  fields,
  ...props
}: Omit<DrawerProps, "children"> & {fields?: Field[]}) {
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
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                {currentStep === "fields" && (
                  <IconButton
                    aria-label="Go back"
                    icon={<ChevronLeftIcon height={8} width={8} />}
                    size="sm"
                    variant="ghost"
                    onClick={() => setCurrentStep("details")}
                  />
                )}
                <p className="text-2xl sm:text-3xl font-medium">Tu pedido</p>
              </div>
              <CloseButton onClick={onClose} />
            </div>
          </DrawerHeader>
          <DrawerBody data-testid="cart" paddingX={4}>
            {currentStep === "details" && <Details cart={cart} onChange={handleUpdateCart} />}
            {fields && currentStep === "fields" ? (
              <Fields checkout={checkout} fields={fields} onChange={handleUpdateField} />
            ) : null}
          </DrawerBody>
          <DrawerFooter paddingX={4}>
            {fields && currentStep === "details" ? (
              <div className="flex flex-col gap-4 w-full">
                <hr />
                <div className="items-center flex gap-2 text-lg font-medium justify-between">
                  <p>Total</p>
                  <p>{total}</p>
                </div>
                <Button
                  colorScheme="primary"
                  data-testid="continue-order"
                  size="lg"
                  width="100%"
                  onClick={() => setCurrentStep("fields")}
                >
                  Continuar
                </Button>
              </div>
            ) : null}
            {(currentStep === "fields" || !fields) && (
              <Button
                as="a"
                colorScheme="whatsapp"
                data-testid="complete-order"
                href={`https://wa.me/5491141414141?text=${encodeURIComponent(message)}`}
                leftIcon={
                  <img
                    alt="Whatsapp logo"
                    src="https://icongr.am/fontawesome/whatsapp.svg?size=24&color=000"
                  />
                }
                rel="noopener noreferrer"
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
}

export default CartDrawer;
