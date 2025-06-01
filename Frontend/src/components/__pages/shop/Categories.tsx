'use client';

import { Category } from '@/modules/category/type';
import { Button } from '@heroui/react';

import { useShopContext } from './context';

type Props = {
  categories: Category[];
};

export const Categories = ({ categories }: Props) => {
  const { categoryId, setCategoryId } = useShopContext();

  const handleCategoryClick = (categoryId: number) =>
    setCategoryId(prev => (prev !== undefined && prev === categoryId ? undefined : categoryId));

  return (
    <div className="mb-5 mt-5">
      <h1 className="text-2xl font-bold mb-5">Категории</h1>
      <div className="flex flex-wrap gap-4">
        {categories.map(category => (
          <Button
            key={category.id}
            variant={categoryId === category.id ? 'solid' : 'bordered'}
            color={categoryId === category.id ? 'primary' : 'default'}
            onPress={() => handleCategoryClick(category.id)}>
            {category.name}
          </Button>
        ))}
      </div>
    </div>
  );
};
