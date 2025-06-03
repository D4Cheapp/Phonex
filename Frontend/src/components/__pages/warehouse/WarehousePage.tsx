import { Product } from '@/modules/product/types';
import { Shop } from '@/modules/shop/types';
import { WarehouseProduct } from '@/modules/warehouse-products/types';

import { AddWarehouseButton } from './AddWarehouseButton';
import { WarehouseListProvider } from './context';
import { WarehouseFilter } from './WarehouseFilter';
import { WarehouseList } from './WarehouseList';

type Props = {
  warehouseProducts: WarehouseProduct[];
  shops: Shop[];
  products: Product[];
};

export const WarehousePage = ({ warehouseProducts, shops, products }: Props) => (
  <WarehouseListProvider
    initialWarehouseProducts={warehouseProducts}
    shops={shops}
    products={products}>
    <div className="flex justify-between items-start gap-5 mb-10 mt-10">
      <h1 className="text-3xl font-bold">Список товаров на складе</h1>
      <AddWarehouseButton />
    </div>
    <WarehouseFilter shops={shops} products={products} />
    <WarehouseList />
  </WarehouseListProvider>
);
