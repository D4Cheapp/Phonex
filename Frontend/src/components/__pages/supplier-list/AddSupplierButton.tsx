'use client';

import { Button } from '@heroui/react';
import { SupplierModal } from 'components/Modals/SupplierModal';

import { useSupplierListContext } from './context';

export const AddSupplierButton = () => {
  const { isAddSupplierModalOpen, setIsAddSupplierModalOpen } = useSupplierListContext();

  return (
    <>
      <Button color="primary" variant="bordered" onPress={() => setIsAddSupplierModalOpen(true)}>
        Добавить поставщика
      </Button>
      <SupplierModal
        isOpen={isAddSupplierModalOpen}
        onClose={() => setIsAddSupplierModalOpen(false)}
      />
    </>
  );
};
