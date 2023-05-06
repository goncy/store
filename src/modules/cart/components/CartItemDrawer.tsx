import type {Option} from "~/product/types";

import type {CartItem} from "../types";
import type {ComponentProps} from "react";

import {useState, useMemo} from "react";

import {RadioGroup, RadioGroupItem} from "~/ui/components/form/radio-group";
import {Label} from "~/ui/components/form/label";
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
    () =>
      item.options
        ? Object.entries(item.options).map(([title, _options]) => ({title, options: _options}))
        : [],
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
      <SheetContent className="grid grid-rows-[auto_1fr_auto]" size="sm">
        <SheetHeader className="pr-8 text-left">
          <SheetTitle className="text-2xl font-medium">{item.title}</SheetTitle>
        </SheetHeader>

        <div className="overflow-y-auto" data-testid="cart-item-drawer">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <img
                alt={item.title}
                className="h-[240px] w-full bg-secondary object-contain"
                src={item.image}
              />
              <SheetDescription className="text-md text-muted-foreground sm:text-lg">
                {item.description}
              </SheetDescription>
            </div>
            {Boolean(options.length) && (
              <div className="flex flex-col gap-8">
                {options.map((category) => {
                  return (
                    <div key={category.title} className="flex w-full flex-col gap-4">
                      <p className="text-xl font-medium">{category.title}</p>
                      <RadioGroup value={formData.options?.[category.title]?.[0]?.title}>
                        <div className="flex flex-col gap-4">
                          {category.options.map((option) => (
                            <div key={option.title} className="flex items-center gap-x-3">
                              <RadioGroupItem
                                id={option.title}
                                value={option.title}
                                onClick={() => handleSelectOption(option)}
                              />
                              <Label htmlFor={option.title}>
                                <div className="flex w-full justify-between">
                                  <p>{option.title}</p>
                                  {Boolean(option.price) && (
                                    <div className="flex items-center gap-2">
                                      <span className="text-lg leading-tight text-muted-foreground">
                                        {option.price < 0 ? "-" : "+"}
                                      </span>
                                      <p className="font-medium">
                                        {parseCurrency(Math.abs(option.price))}
                                      </p>
                                    </div>
                                  )}
                                </div>
                              </Label>
                            </div>
                          ))}
                        </div>
                      </RadioGroup>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <SheetFooter>
          <div className="flex w-full flex-col gap-4">
            <hr />
            <div className="flex items-center justify-between text-lg font-medium">
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
