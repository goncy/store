import type {Product} from "~/product/types";

export interface CartItem extends Product {
  quantity: number;
}

export interface RadioField {
  title: string;
  type: "radio";
  options: string[];
  required: boolean;
  note?: string;
}

export interface TextField {
  title: string;
  type: "text";
  placeholder: string;
  required: boolean;
  note?: string;
}

export type Field = RadioField | TextField;

export type Cart = Map<number, CartItem>;

export type Checkout = Map<string, string>;
