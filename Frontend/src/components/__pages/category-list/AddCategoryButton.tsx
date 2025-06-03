'use client';

import { Button } from '@heroui/react';

import { useCategoryListContext } from './context';

export const AddCategoryButton = () => {
  const { setIsAddCategoryModalOpen } = useCategoryListContext();

  return (
    <Button color="primary" variant="bordered" onPress={() => setIsAddCategoryModalOpen(true)}>
      Добавить категорию
    </Button>
  );
};
