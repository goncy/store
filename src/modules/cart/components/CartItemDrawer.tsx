import type {Option} from "~/product/types";

import type {CartItem} from "../types";
import type {DrawerProps} from "@chakra-ui/react";

import {useState, useMemo} from "react";
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  CloseButton,
  DrawerHeader,
  DrawerBody,
  Button,
  DrawerFooter,
  RadioGroup,
  Radio,
} from "@chakra-ui/react";

import {parseCurrency} from "~/currency/utils";

import {getCartItemPrice} from "../utils";

function CartItemDrawer({
  item,
  onClose,
  onSubmit,
  ...props
}: Omit<DrawerProps, "children"> & {
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
    <Drawer placement="right" size="sm" onClose={onClose} {...props}>
      <DrawerOverlay>
        <DrawerContent paddingTop={4}>
          <DrawerHeader paddingX={4}>
            <div className="flex items-center justify-between">
              <p className="text-2xl sm:text-3xl font-medium">{item.title}</p>
              <CloseButton onClick={onClose} />
            </div>
          </DrawerHeader>

          <DrawerBody data-testid="cart-item-drawer" paddingX={4}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <img alt={item.title} className="h-[240px] object-cover w-full" src={item.image} />
                <p className="text-white/50">{item.description}</p>
              </div>
              {options.length ? (
                <div className="flex flex-col gap-4">
                  {options.map((category) => (
                    <div key={category.title} className="flex flex-col gap-2 w-full">
                      <p className="text-xl font-medium">{category.title}</p>
                      <RadioGroup
                        colorScheme="primary"
                        value={formData.options?.[category.title]?.[0]?.title}
                      >
                        <div className="flex flex-col gap-2">
                          {category.options.map((option) => (
                            <Radio
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
                            </Radio>
                          ))}
                        </div>
                      </RadioGroup>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-white/40">No hay elementos en tu carrito</p>
              )}
            </div>
          </DrawerBody>

          <DrawerFooter paddingX={4}>
            <div className="flex flex-col gap-4 w-full">
              <hr />
              <div className="flex items-center text-lg font-medium justify-between">
                <p>Total</p>
                <p>{total}</p>
              </div>
              <Button
                colorScheme="primary"
                isDisabled={!isValid}
                size="lg"
                width="100%"
                onClick={() => onSubmit(formData)}
              >
                Agregar al pedido
              </Button>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
}

export default CartItemDrawer;
