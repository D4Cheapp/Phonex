'use client';

import { Input } from '@heroui/react';

import { useEffect, useState } from 'react';

import { useSupplierListContext } from './context';

export const SupplierFilter = () => {
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();

  const { setName: setNameContext, setEmail: setEmailContext } = useSupplierListContext();

  useEffect(() => {
    const timer = setTimeout(() => {
      setNameContext(name);
      setEmailContext(email);
    }, 1000);
    return () => clearTimeout(timer);
  }, [name, email]);

  return (
    <div className="grid grid-cols-2 gap-5">
      <Input label="Имя" variant="bordered" value={name} onChange={e => setName(e.target.value)} />
      <Input
        label="Почта"
        variant="bordered"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
    </div>
  );
};
