'use client';

import { Button } from '@heroui/react';
import { Routes } from 'constants/routes';

import { useRouter } from 'next/navigation';

export const AddSupplyButton = () => {
  const { push } = useRouter();

  const handleAddSupply = () => {
    push(Routes.suppliesCreation);
  };

  return (
    <Button color="primary" onPress={handleAddSupply}>
      Добавить поставку
    </Button>
  );
};
