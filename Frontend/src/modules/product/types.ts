import { Category } from '../category/type';

type Characteristic = {
  id: number;
  name: string;
  value: string;
};

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: Category;
  characteristics: Characteristic[];
};
