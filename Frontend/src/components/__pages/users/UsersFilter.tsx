'use client';

import { Shop } from '@/modules/shop/types';
import { Input, Select, SelectItem } from '@heroui/react';

import { useEffect, useState } from 'react';

import { useUsersListContext } from './context';

type Props = {
  shops: Shop[] | null;
};

export const UsersFilter = ({ shops }: Props) => {
  const [search, setSearch] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [roleId, setRoleId] = useState<string>();
  const [shopId, setShopId] = useState<string>();

  const {
    setSearch: setSearchContext,
    setEmail: setEmailContext,
    setRoleId: setRoleIdContext,
    setShopId: setShopIdContext,
  } = useUsersListContext();

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchContext(search);
      setEmailContext(email);
      setRoleIdContext(roleId ? Number(roleId) : undefined);
      setShopIdContext(shopId ? Number(shopId) : undefined);
    }, 1000);
    return () => clearTimeout(timer);
  }, [search, email, roleId, shopId]);

  return (
    <div className="grid grid-cols-2 gap-5">
      <Input
        label="Имя"
        variant="bordered"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <Input
        label="Email"
        variant="bordered"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <Select
        label="Роль"
        variant="bordered"
        value={roleId?.toString() || ''}
        onChange={e => setRoleId(e.target.value)}>
        <SelectItem key="1">Администратор</SelectItem>
        <SelectItem key="2">Менеджер</SelectItem>
        <SelectItem key="3">Кассир</SelectItem>
      </Select>
      {shops && (
        <Select
          label="Магазин"
          variant="bordered"
          value={shopId?.toString() || ''}
          onChange={e => setShopId(e.target.value)}>
          {shops?.map(shop => <SelectItem key={shop.id}>{shop.name}</SelectItem>)}
        </Select>
      )}
    </div>
  );
};
