'use client';

import { Category } from '@/modules/category/type';
import { Button } from '@heroui/react';

import DeleteIcon from 'icons/delete.svg';

import { useCategoryListContext } from './context';

type Props = {
  category: Category;
};

export const CategoryListItem = ({ category }: Props) => {
  const { setSelectedCategory, setIsEditCategoryModalOpen, setIsConfirmModalOpen } =
    useCategoryListContext();

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedCategory(category);
    setIsEditCategoryModalOpen(true);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedCategory(category);
    setIsConfirmModalOpen(true);
  };

  return (
    <div
      onClick={handleEdit}
      className="flex items-center justify-between max-md:[grid-template-columns:1fr_1fr] max-md:gap-6 p-4 pl-10 pr-10 max-md:pl-5 max-md:pr-5 gap-4 border-medium shadow-sm rounded-xl hover:bg-gray-100 transition-all cursor-pointer">
      <p>{category.name}</p>
      <span className="cursor-pointer max-md:hidden" onClick={handleDelete}>
        <DeleteIcon className="w-6 h-6" />
      </span>
      <Button
        className="col-span-full mt-5 hidden max-md:block"
        color="danger"
        variant="bordered"
        onClick={handleDelete}>
        Удалить
      </Button>
    </div>
  );
};
