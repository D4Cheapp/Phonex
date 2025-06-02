import { Category } from '../category/type';

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: Category;
};
