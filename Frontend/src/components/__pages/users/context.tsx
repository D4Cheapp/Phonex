'use client';

import { getUserList } from '@/modules/user/get-user-list';
import { User } from '@/modules/user/types';

import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';

type UsersListContextType = {
  users: User[] | null;
  setSearch: Dispatch<SetStateAction<string | undefined>>;
  setEmail: Dispatch<SetStateAction<string | undefined>>;
  setRoleId: Dispatch<SetStateAction<number | undefined>>;
  setShopId: Dispatch<SetStateAction<number | undefined>>;
};

const UsersListContext = createContext({} as UsersListContextType);

type Props = {
  children: React.ReactNode;
  initialUsers: User[] | null;
};

export const UsersListProvider = ({ children, initialUsers }: Props) => {
  const [users, setUsers] = useState<User[] | null>(initialUsers);
  const [search, setSearch] = useState<string | undefined>('');
  const [email, setEmail] = useState<string | undefined>('');
  const [roleId, setRoleId] = useState<number | undefined>();
  const [shopId, setShopId] = useState<number | undefined>();

  const fetchUsers = async () => {
    const response = await getUserList({ search, email, shopId, roleId });
    setUsers([]);
    setUsers(response || []);
  };

  useEffect(() => {
    fetchUsers();
  }, [search, email, shopId, roleId]);

  return (
    <UsersListContext.Provider value={{ users, setSearch, setEmail, setRoleId, setShopId }}>
      {children}
    </UsersListContext.Provider>
  );
};

export const useUsersListContext = () => useContext(UsersListContext);
