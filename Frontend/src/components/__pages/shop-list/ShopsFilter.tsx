'use client';

import { Input } from '@heroui/react';

import { useEffect, useState } from 'react';

import { useShopListContext } from './context';

export const ShopsFilter = () => {
  const [name, setName] = useState<string>();
  const [address, setAddress] = useState<string>();

  const { setName: setNameContext, setAddress: setAddressContext } = useShopListContext();

  useEffect(() => {
    const timer = setTimeout(() => {
      setNameContext(name);
      setAddressContext(address);
    }, 1000);
    return () => clearTimeout(timer);
  }, [name, address]);

  return (
    <div className="grid grid-cols-2 gap-5">
      <Input label="Имя" variant="bordered" value={name} onChange={e => setName(e.target.value)} />
      <Input
        label="Адрес"
        variant="bordered"
        value={address}
        onChange={e => setAddress(e.target.value)}
      />
    </div>
  );
};
