import { SupplyStatusE } from 'constants/supply-status';

import { Product } from '../product/types';
import { Shop } from '../shop/types';
import { Supplier } from '../suppliers/types';

export type SupplyStatus = {
  id: string;
  name: SupplyStatusE;
};

export type Supply = {
  id: string;
  supplier: Supplier;
  shop: Shop;
  supply_status: SupplyStatus;
  supplyItems?: SupplyItem[];
};

export type SupplyItem = {
  id?: string;
  supply?: Supply;
  product: Product;
  quantity: number;
};
