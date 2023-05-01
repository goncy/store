import type {Option} from "~/product/types";

import type {CartItem} from "../types";
import type {ComponentProps} from "react";

import {useState, useMemo} from "react";

import {RadioGroup, RadioGroupItem} from "~/ui/components/form/radio-group";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "~/ui/components/overlay/sheet";
import {Button} from "~/ui/components/control/button";
import {parseCurrency} from "~/currency/utils";

import {getCartItemPrice} from "../utils";

function CartItemDrawer({
  item,
  onClose,
  onSubmit,
  ...props
}: ComponentProps<typeof Sheet> & {
  item: CartItem;
  onClose: VoidFunction;
  onSubmit: (item: CartItem) => void;
}) {
  const [formData, setFormData] = useState<CartItem>(() => ({...item, options: {}}));
  const total = useMemo(() => parseCurrency(getCartItemPrice(formData)), [formData]);
  const options = useMemo(
    () => Object.entries(item.options!).map(([title, _options]) => ({title, options: _options})),
    [item],
  );
  const isValid = useMemo(
    () => options.length === Object.keys(formData.options!).length,
    [formData, options],
  );

  function handleSelectOption(option: Option) {
    setFormData((_formData) => ({
      ..._formData,
      options: {..._formData.options, [option.category]: [option]},
    }));
  }

  return (
    <Sheet onOpenChange={(isOpen) => !isOpen && onClose()} {...props}>
      <SheetContent position="right">
        <SheetHeader className="mb-4">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-2xl sm:text-3xl font-medium">{item.title}</SheetTitle>
          </div>
        </SheetHeader>

        <div data-testid="cart-item-drawer">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <img alt={item.title} className="h-[240px] object-cover w-full" src={item.image} />
              <SheetDescription className="text-muted-foreground">
                {item.description}
              </SheetDescription>
            </div>
            {options.length ? (
              <div className="flex flex-col gap-4">
                {options.map((category) => (
                  <div key={category.title} className="flex flex-col gap-2 w-full">
                    <p className="text-xl font-medium">{category.title}</p>
                    <RadioGroup value={formData.options?.[category.title]?.[0]?.title}>
                      <div className="flex flex-col gap-2">
                        {category.options.map((option) => (
                          <RadioGroupItem
                            key={option.title}
                            value={option.title}
                            onChange={() => handleSelectOption(option)}
                          >
                            <div className="flex justify-between w-full">
                              <p>{option.title}</p>
                              {Boolean(option.price) && (
                                <p className="font-medium">{parseCurrency(option.price)}</p>
                              )}
                            </div>
                          </RadioGroupItem>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No hay elementos en tu carrito</p>
            )}
          </div>
        </div>

        <SheetFooter>
          <div className="flex flex-col gap-4 w-full">
            <hr />
            <div className="flex items-center text-lg font-medium justify-between">
              <p>Total</p>
              <p>{total}</p>
            </div>
            <Button
              className="w-full"
              disabled={!isValid}
              size="lg"
              variant="brand"
              onClick={() => onSubmit(formData)}
            >
              Agregar al pedido
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default CartItemDrawer;
