'use client';

import { Shop } from '@/modules/shop/types';
import { Button } from '@heroui/react';

import DeleteIcon from 'icons/delete.svg';

import { useShopListContext } from './context';

type Props = {
  shop: Shop;
};

export const ShopListItem = ({ shop }: Props) => {
  const { setSelectedShop, setIsEditShopModalOpen, setIsConfirmModalOpen } = useShopListContext();

  const handleSelectShop = () => {
    setSelectedShop(shop);
    setIsEditShopModalOpen(true);
  };

  const handleDeleteShop = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedShop(shop);
    setIsConfirmModalOpen(true);
  };

  return (
    <div
      onClick={handleSelectShop}
      className="grid [grid-template-columns:1fr_1fr_1.5rem] items-center max-md:[grid-template-columns:1fr_1fr] max-md:gap-6 p-4 pl-10 pr-10 max-md:pl-5 max-md:pr-5 gap-4 border-medium shadow-sm rounded-xl hover:bg-gray-100 transition-all cursor-pointer">
      <div>
        <p className="text-gray-500 hidden max-md:block">Название</p>
        <p>{shop.name}</p>
      </div>
      <div>
        <p className="text-gray-500 hidden max-md:block">Адрес</p>
        <p>{shop.address}</p>
      </div>
      <span className="cursor-pointer max-md:hidden" onClick={handleDeleteShop}>
        <DeleteIcon className="w-6 h-6" />
      </span>
      <Button
        className="col-span-full mt-5 hidden max-md:block"
        color="danger"
        variant="bordered"
        onClick={handleDeleteShop}>
        Удалить
      </Button>
    </div>
  );
};
