import { Category } from '../category/type';

export type Characteristic = {
  id: number;
  name: string;
  value: string;
};

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string | File;
  product_category?: Category;
  product_category_id?: number;
  category: Category;
  characteristics: Characteristic[];
};
