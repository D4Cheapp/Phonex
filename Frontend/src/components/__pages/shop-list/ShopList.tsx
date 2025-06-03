'use client';

import { deleteShop } from '@/modules/shop/delete-shop';
import { ConfirmModal } from 'components/Modals/ConfirmModal';
import { ShopModal } from 'components/Modals/ShopModal';

import { useShopListContext } from './context';
import { ShopListItem } from './ShopListItem';

export const ShopList = () => {
  const {
    shops,
    isEditShopModalOpen,
    isConfirmModalOpen,
    setIsConfirmModalOpen,
    selectedShop,
    setSelectedShop,
    setShops,
    setIsEditShopModalOpen,
  } = useShopListContext();

  const handleConfirmModalClose = () => {
    setIsConfirmModalOpen(false);
  };

  const handleConfirmModalConfirm = async () => {
    if (!selectedShop) return;
    await deleteShop(selectedShop.id);
    setShops(prev => prev?.filter(shop => shop.id !== selectedShop.id));
    setIsConfirmModalOpen(false);
    setSelectedShop(undefined);
  };

  return (
    <div className="flex flex-col gap-4 mt-10">
      <div className="grid [grid-template-columns:1fr_1fr_1.5rem] max-md:hidden pl-10 pr-10 max-md:pl-5 max-md:pr-5 gap-4">
        <p className="text-gray-500">Название</p>
        <p className="text-gray-500">Адрес</p>
      </div>
      {shops?.map(shop => <ShopListItem key={shop.id} shop={shop} />)}
      <ConfirmModal
        title="Удаление магазина"
        description="Вы уверены, что хотите удалить этот магазин?"
        isOpen={isConfirmModalOpen}
        onClose={handleConfirmModalClose}
        onConfirm={handleConfirmModalConfirm}
      />
      {selectedShop && (
        <ShopModal
          isOpen={isEditShopModalOpen}
          onClose={() => setIsEditShopModalOpen(false)}
          shop={selectedShop}
        />
      )}
    </div>
  );
};
