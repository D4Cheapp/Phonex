'use client';

import { Category } from '@/modules/category/type';
import { Button } from '@heroui/react';

import { useShopContext } from './context';

type Props = {
  categories: Category[];
};

export const ShopCategories = ({ categories }: Props) => {
  const { category, setCategory } = useShopContext();

  const handleCategoryClick = (categoryId: number) =>
    setCategory(prev => (prev !== undefined && prev === categoryId ? undefined : categoryId));

  return (
    <div className="mb-5 mt-5">
      <div className="flex flex-wrap gap-4">
        {categories.map(({ id, name }) => (
          <Button
            key={id}
            variant={category === id ? 'solid' : 'bordered'}
            color={category === id ? 'primary' : 'default'}
            onPress={() => handleCategoryClick(id)}>
            {name}
          </Button>
        ))}
      </div>
    </div>
  );
};
