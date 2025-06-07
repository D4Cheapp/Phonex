import { Shop } from '@/modules/shop/types';
import { Supplier } from '@/modules/suppliers/types';
import { Supply } from '@/modules/supplies/types';

import { AddSupplyButton } from './AddSupplyButton';
import { SupplyListProvider } from './context';
import { SuppliesFilter } from './SuppliesFilter';
import { SuppliesList } from './SuppliesList';

type Props = {
  shops: Shop[];
  suppliers: Supplier[];
  supplies: Supply[];
};

export const SuppliesPage = ({ shops, suppliers, supplies }: Props) => {
  return (
    <SupplyListProvider initialSupply={supplies} shops={shops} suppliers={suppliers}>
      <div className="w-full flex justify-between my-10">
        <h1 className="text-3xl font-bold mb-8">Поставки</h1>
        <AddSupplyButton />
      </div>
      <SuppliesFilter />
      <SuppliesList />
    </SupplyListProvider>
  );
};
