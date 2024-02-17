import type {Store} from "~/store/types";

import type {CartItem, Field} from "../../types";

import {useEffect, useState} from "react";
import {X} from "lucide-react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {Button} from "@/components/ui/button";
import WhatsappIcon from "@/components/icons/whatsapp";

import {useCart} from "../../context/client";

import Details from "./Details";
import Fields from "./Fields";

function CartDrawer({
  onClose,
  store,
  fields,
  ...props
}: Omit<React.ComponentProps<typeof Sheet>, "children"> & {
  fields?: Field[];
  store: Store;
  onClose: VoidFunction;
}) {
  const [{total, message, cart, checkout}, {removeItem, updateItem, updateField}] = useCart();
  const [currentStep, setCurrentStep] = useState<"details" | "fields">("details");

  function handleUpdateCart(id: number, item: CartItem) {
    if (!item.quantity) {
      removeItem(id);

      return;
    }

    updateItem(id, item);
  }

  function handleUpdateField(id: string, value: string) {
    updateField(id, value);
  }

  useEffect(() => {
    if (!cart.size) {
      onClose();
    }
  }, [cart.size, onClose]);

  return (
    <Sheet open onOpenChange={(_isOpen) => !_isOpen && onClose()} {...props}>
      <SheetContent className="grid grid-cols-1 grid-rows-[auto_1fr_auto]">
        <SheetHeader>
          <SheetClose className="-mx-6 ml-auto h-12 w-14 rounded-l-lg border border-border bg-background py-2 pl-2 pr-4 shadow-lg">
            <X className="h-8 w-8" />
          </SheetClose>
          <SheetTitle className="text-left text-2xl font-medium">Tu pedido</SheetTitle>
        </SheetHeader>

        <div className="overflow-y-auto" data-testid="cart">
          {currentStep === "details" && <Details cart={cart} onChange={handleUpdateCart} />}
          {fields && currentStep === "fields" ? (
            <Fields checkout={checkout} fields={fields} onChange={handleUpdateField} />
          ) : null}
        </div>

        <SheetFooter>
          {fields && currentStep === "details" ? (
            <div className="flex w-full flex-col gap-4">
              <hr />
              <div className="flex items-center justify-between gap-2 text-lg font-medium">
                <p>Total</p>
                <p>{total}</p>
              </div>
              <Button
                className="w-full"
                data-testid="continue-order"
                size="lg"
                variant="brand"
                onClick={() => {
                  setCurrentStep("fields");
                }}
              >
                Continuar
              </Button>
            </div>
          ) : null}
          {(currentStep === "fields" || !fields) && (
            <div className="flex w-full flex-col gap-4">
              <hr />
              <Button
                className="w-full"
                size="lg"
                variant="ghost"
                onClick={() => {
                  setCurrentStep("details");
                }}
              >
                Revisar pedido
              </Button>
              <a
                className="w-full"
                href={`https://wa.me/${store.phone}?text=${encodeURIComponent(message)}`}
                rel="noopener noreferrer"
                target="_blank"
              >
                <Button className="w-full" data-testid="complete-order" size="lg" variant="brand">
                  <div className="inline-flex items-center gap-2">
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
