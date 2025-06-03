'use client';

import { CategoryListItem } from './CategoryListItem';
import { useCategoryListContext } from './context';

export const CategoryList = () => {
  const { categories } = useCategoryListContext();

  if (!categories || categories.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <p className="text-gray-500 text-lg">Категории не найдены</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {categories.map(category => (
        <CategoryListItem key={category.id} category={category} />
      ))}
    </div>
  );
};
