'use client';

import { Button } from '@heroui/react';
import { WarehouseModal } from 'components/Modals/WarehouseModal';

import { useWarehouseListContext } from './context';

export const AddWarehouseButton = () => {
  const { isAddWarehouseProductModalOpen, setIsAddWarehouseProductModalOpen, shops, products } =
    useWarehouseListContext();

  return (
    <>
      <Button color="primary" onPress={() => setIsAddWarehouseProductModalOpen(true)}>
        Добавить позицию на склад
      </Button>
      {isAddWarehouseProductModalOpen && (
        <WarehouseModal
          isOpen={isAddWarehouseProductModalOpen}
          onClose={() => setIsAddWarehouseProductModalOpen(false)}
          products={products}
          shops={shops}
        />
      )}
    </>
  );
};
