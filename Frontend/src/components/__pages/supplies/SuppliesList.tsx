'use client';

import { useSupplyListContext } from './context';
import { SupplyListItem } from './SupplyListItem';

export const SuppliesList = () => {
  const { supplies } = useSupplyListContext();

  return (
    <div className="flex flex-col gap-4 mt-10">
      <div className="grid [grid-template-columns:1fr_1fr_1fr] max-md:hidden pl-10 pr-10 max-md:pl-5 max-md:pr-5 gap-4">
        <p className="text-gray-500">Магазин</p>
        <p className="text-gray-500">Поставщик</p>
        <p className="text-gray-500">Статус</p>
      </div>
      {supplies?.map(supply => <SupplyListItem key={supply.id} supply={supply} />)}
    </div>
  );
};
