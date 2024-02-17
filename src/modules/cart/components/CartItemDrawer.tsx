import type {Option} from "~/product/types";

import type {CartItem} from "../types";
import type {ComponentProps} from "react";

import {useState, useMemo} from "react";
import {X} from "lucide-react";

import {parseCurrency} from "~/currency/utils";

import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetClose,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {Label} from "@/components/ui/label";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";

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

  function handleSelectOption(option: Option) {
    setFormData((_formData) => ({
      ..._formData,
      options: {..._formData.options, [option.category]: [option]},
    }));
  }

  return (
    <Sheet onOpenChange={(isOpen) => !isOpen && onClose()} {...props}>
      <SheetContent className="grid grid-rows-[auto_1fr_auto]">
        <SheetHeader>
          <SheetClose className="z-20 -mx-6 ml-auto h-12 w-14 rounded-l-lg border border-border bg-background py-2 pl-2 pr-4 shadow-lg">
            <X className="h-8 w-8" />
          </SheetClose>
        </SheetHeader>

        <div
          className={cn("overflow-y-auto", {"-mt-16": item.image})}
          data-testid="cart-item-drawer"
        >
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              {Boolean(item.image) && (
                <img
                  alt={item.title}
                  className="h-[240px] w-full bg-secondary object-contain sm:h-[320px]"
                  src={item.image}
                />
              )}
              <SheetTitle className="text-2xl font-medium">{item.title}</SheetTitle>
              <SheetDescription className="text-md whitespace-pre-wrap text-muted-foreground sm:text-lg">
                {item.description}
              </SheetDescription>
            </div>
            {Boolean(options.length) && (
              <div className="flex flex-col gap-8">
                {options.map((category) => {
                  return (
                    <div key={category.title} className="flex w-full flex-col gap-4">
                      <p className="text-lg font-medium">{category.title}</p>
                      <RadioGroup value={formData.options?.[category.title]?.[0]?.title}>
                        <div className="flex flex-col gap-4">
                          {category.options.map((option) => (
                            <div key={option.title} className="flex items-center gap-x-3">
                              <RadioGroupItem
                                id={option.title}
                                value={option.title}
                                onClick={() => {
                                  handleSelectOption(option);
                                }}
                              />
                              <Label className="w-full" htmlFor={option.title}>
                                <div className="flex w-full items-center justify-between gap-2">
                                  <p>{option.title}</p>
                                  {Boolean(option.price) && (
                                    <div className="flex items-center gap-1">
                                      <p className="text-muted-foreground">
                                        {option.price < 0 ? "-" : "+"}
                                      </p>
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
              size="lg"
              variant="brand"
              onClick={() => {
                onSubmit(formData);
              }}
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
