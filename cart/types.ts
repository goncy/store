import {Product} from "../product/types";

export interface CartItem extends Product {
  quantity: number;
}
