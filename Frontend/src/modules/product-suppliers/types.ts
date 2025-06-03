import { Product } from '../product/types';
import { Shop } from '../shop/types';

export type ProductSupplier = {
  id: string;
  name: string;
  price: number;
  is_primary: boolean;
  product: Product;
  shop: Shop;
};

export type CreateProductSupplierDto = {
  price: number;
  isPrimary: boolean;
  productId: string;
  supplierId: string;
  shopId: string;
};
