'use client';

import { Button } from '@heroui/react';
import { ShopModal } from 'components/Modals/ShopModal';

import { useShopListContext } from './context';

export const AddShopButton = () => {
  const { isAddShopModalOpen, setIsAddShopModalOpen } = useShopListContext();

  return (
    <>
      <Button color="primary" onPress={() => setIsAddShopModalOpen(true)}>
        Добавить магазин
      </Button>
      <ShopModal isOpen={isAddShopModalOpen} onClose={() => setIsAddShopModalOpen(false)} />
    </>
  );
};
