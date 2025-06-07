'use client';

import { handleSupplyStatus } from '@/modules/supplies/handle-supply-status';
import { Supply } from '@/modules/supplies/types';

import { useRouter } from 'next/navigation';

type Props = {
  supply: Supply;
};

export const SupplyListItem = ({ supply }: Props) => {
  const { push } = useRouter();

  const handleSupplyClick = () => push(`/supplies/${supply.id}`);

  return (
    <div
      onClick={handleSupplyClick}
      className="grid grid-cols-3 items-center max-md:[grid-template-columns:1fr_1fr] max-md:gap-6 p-4 pl-10 pr-10 max-md:pl-5 max-md:pr-5 gap-4 border-medium shadow-sm rounded-xl hover:bg-gray-100 transition-all cursor-pointer">
      <p>{supply.shop.name}</p>
      <p>{supply.supplier.name}</p>
      <p>{handleSupplyStatus(supply.supply_status.name)}</p>
    </div>
  );
};
