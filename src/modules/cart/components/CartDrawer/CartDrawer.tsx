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

  function handleUpdateCart(id: symbol, item: CartItem) {
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
      <SheetContent {...props}>
        <SheetHeader>
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              {currentStep === "fields" && (
                <Button
                  aria-label="Go back"
                  size="sm"
                  variant="ghost"
                  onClick={() => setCurrentStep("details")}
                >
                  <span>←</span>
                </Button>
              )}
              <SheetTitle className="text-2xl sm:text-3xl font-medium">Tu pedido</SheetTitle>
            </div>
          </div>
        </SheetHeader>
        <div data-testid="cart">
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
            <a
              className="w-full"
              href={`https://wa.me/5491141414141?text=${encodeURIComponent(message)}`}
              rel="noopener noreferrer"
            >
              <Button className="w-full" data-testid="complete-order" size="lg" variant="brand">
                <div className="inline-flex gap-2 items-center">
                  <img
                    alt="Whatsapp logo"
                    src="https://icongr.am/fontawesome/whatsapp.svg?size=24&color=ffffff"
                  />
                  <span>Completar pedido</span>
                </div>
              </Button>
            </a>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default CartDrawer;
