'use client';

import { Input } from '@heroui/react';

import { useEffect, useState } from 'react';

import { useShopContext } from './context';

export const ShopSearch = () => {
  const [search, setSearch] = useState('');

  const { setSearch: setSearchContext } = useShopContext();

  useEffect(() => {
    const timer = setTimeout(() => setSearchContext(search), 500);
    return () => clearTimeout(timer);
  }, [search]);

  return (
    <Input
      classNames={{ base: 'w-full mb-5 mt-5' }}
      value={search}
      onChange={event => setSearch(event.target.value)}
      variant="bordered"
      label="Поиск"
    />
  );
};
