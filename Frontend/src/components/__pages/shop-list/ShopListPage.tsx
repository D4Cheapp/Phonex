import { Shop } from '@/modules/shop/types';

import { AddShopButton } from './AddShopButton';
import { ShopListProvider } from './context';
import { ShopList } from './ShopList';
import { ShopsFilter } from './ShopsFilter';

type Props = {
  initialShop: Shop[] | null;
};

export const ShopListPage = ({ initialShop }: Props) => {
  return (
    <ShopListProvider initialShop={initialShop}>
      <div className="flex justify-between items-start gap-5 mb-10 mt-10">
        <h1 className="text-3xl font-bold">Список магазинов</h1>
        <AddShopButton />
      </div>
      <ShopsFilter />
      <ShopList />
    </ShopListProvider>
  );
};
