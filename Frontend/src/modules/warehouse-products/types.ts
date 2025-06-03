import { Product } from '../product/types';
import { Shop } from '../shop/types';

export type WarehouseProduct = {
  id: string;
  quantity: number;
  product: Product;
  shop: Shop;
};
