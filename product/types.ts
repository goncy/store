export interface Option {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  price: number;
}

export interface Product {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  options?: Record<Option["category"], Option[]>;
  price: number;
}
