import type {CartItem, Field} from "../../types";

import {useEffect, useState} from "react";

import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "~/ui/components/overlay/sheet";
import {Button} from "~/ui/components/control/button";
import WhatsappIcon from "~/ui/components/icons/whatsapp";

import {useCart} from "../../context";

import Details from "./Details";
import Fields from "./Fields";

function CartDrawer({
  onClose,
  isOpen,
  fields,
  ...props
}: Omit<React.ComponentProps<typeof Sheet>, "children"> & {
  fields?: Field[];
  isOpen: boolean;
  onClose: VoidFunction;
}) {
  const [{total, message, cart, checkout}, {removeItem, updateItem, updateField}] = useCart();
  const [currentStep, setCurrentStep] = useState<"details" | "fields">("details");

  function handleUpdateCart(id: number, item: CartItem) {
    if (!item.quantity) {
      return removeItem(id);
    }

    return updateItem(id, item);
  }

  function handleUpdateField(id: string, value: string) {
    return updateField(id, value);
  }

  useEffect(() => {
    if (!cart.size) {
      onClose();
    }
  }, [cart.size, onClose]);

  useEffect(() => {
    if (!isOpen) {
      setCurrentStep("details");
    }
  }, [isOpen]);

  return (
    <Sheet open={isOpen} onOpenChange={(_isOpen) => !_isOpen && onClose()} {...props}>
      <SheetContent className="grid grid-cols-1 grid-rows-[auto_1fr_auto]" size="sm">
        <SheetHeader>
          <SheetTitle className="text-2xl sm:text-3xl font-medium text-left">Tu pedido</SheetTitle>
        </SheetHeader>
        <div className="overflow-y-auto" data-testid="cart">
          {currentStep === "details" && <Details cart={cart} onChange={handleUpdateCart} />}
          {fields && currentStep === "fields" ? (
            <Fields checkout={checkout} fields={fields} onChange={handleUpdateField} />
          ) : null}
        </div>
        <SheetFooter>
          {fields && currentStep === "details" ? (
            <div className="flex flex-col gap-4 w-full">
              <hr />
              <div className="items-center flex gap-2 text-lg font-medium justify-between">
                <p>Total</p>
                <p>{total}</p>
              </div>
              <Button
                className="w-full"
                data-testid="continue-order"
                size="lg"
                variant="brand"
                onClick={() => setCurrentStep("fields")}
              >
                Continuar
              </Button>
            </div>
          ) : null}
          {(currentStep === "fields" || !fields) && (
            <div className="flex flex-col gap-4 w-full">
              <hr />
              <Button
                className="w-full"
                size="lg"
                variant="ghost"
                onClick={() => setCurrentStep("details")}
              >
                Revisar pedido
              </Button>
              <a
                className="w-full"
                href={`https://wa.me/5491141414141?text=${encodeURIComponent(message)}`}
                rel="noopener noreferrer"
                target="_blank"
              >
                <Button className="w-full" data-testid="complete-order" size="lg" variant="brand">
                  <div className="inline-flex gap-2 items-center">
                    <WhatsappIcon />
                    <span>Completar pedido</span>
                  </div>
                </Button>
              </a>
            </div>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default CartDrawer;
