'use client';

import { Input } from '@heroui/react';

import { useEffect, useState } from 'react';

import { useCategoryListContext } from './context';

export const CategoriesFilter = () => {
  const [searchValue, setSearchValue] = useState('');

  const { setName } = useCategoryListContext();

  useEffect(() => {
    const timer = setTimeout(() => {
      setName(searchValue);
    }, 1000);

    return () => clearTimeout(timer);
  }, [searchValue, setName]);

  return (
    <div className="mb-6">
      <Input
        label="Поиск по названию"
        className="w-full"
        variant="bordered"
        value={searchValue}
        onChange={e => setSearchValue(e.target.value)}
      />
    </div>
  );
};
