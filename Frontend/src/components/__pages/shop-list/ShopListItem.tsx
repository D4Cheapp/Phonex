'use client';

import { Shop } from '@/modules/shop/types';

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
      className="flex justify-between items-center p-4 pl-10 pr-10 max-md:pl-5 max-md:pr-5 gap-4 border-medium shadow-sm rounded-xl hover:bg-gray-100 transition-all cursor-pointer">
      <p>{shop.name}</p>
      <p className="text-gray-500">{shop.address}</p>
      <div className="flex gap-6">
        <span className="cursor-pointer" onClick={handleDeleteShop}>
          <DeleteIcon className="w-6 h-6" />
        </span>
      </div>
    </div>
  );
};
