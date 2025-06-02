'use client';

import { getUserList } from '@/modules/user/get-user-list';
import { User } from '@/modules/user/types';

import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';

type UsersListContextType = {
  users: User[] | null;
  isEditProfileModalOpen: boolean;
  isAddUserModalOpen: boolean;
  selectedUser: User | null;
  isConfirmModalOpen: boolean;
  setSearch: Dispatch<SetStateAction<string | undefined>>;
  setEmail: Dispatch<SetStateAction<string | undefined>>;
  setRoleId: Dispatch<SetStateAction<number | undefined>>;
  setShopId: Dispatch<SetStateAction<number | undefined>>;
  setIsEditProfileModalOpen: Dispatch<SetStateAction<boolean>>;
  setSelectedUser: Dispatch<SetStateAction<User | null>>;
  setIsAddUserModalOpen: Dispatch<SetStateAction<boolean>>;
  setIsConfirmModalOpen: Dispatch<SetStateAction<boolean>>;
  setUsers: Dispatch<SetStateAction<User[]>>;
};

const UsersListContext = createContext({} as UsersListContextType);

type Props = {
  children: React.ReactNode;
  initialUsers: User[] | null;
};

export const UsersListProvider = ({ children, initialUsers }: Props) => {
  const [users, setUsers] = useState<User[]>(initialUsers || []);
  const [search, setSearch] = useState<string | undefined>('');
  const [email, setEmail] = useState<string | undefined>('');
  const [roleId, setRoleId] = useState<number | undefined>();
  const [shopId, setShopId] = useState<number | undefined>();
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState<boolean>(false);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);

  const fetchUsers = async () => {
    const response = await getUserList({ search, email, shopId, roleId });
    setUsers([]);
    setUsers(response || []);
  };

  useEffect(() => {
    fetchUsers();
  }, [search, email, shopId, roleId]);

  return (
    <UsersListContext.Provider
      value={{
        users,
        isEditProfileModalOpen,
        isAddUserModalOpen,
        selectedUser,
        setSearch,
        setEmail,
        setRoleId,
        setShopId,
        setIsEditProfileModalOpen,
        setSelectedUser,
        setIsAddUserModalOpen,
        isConfirmModalOpen,
        setIsConfirmModalOpen,
        setUsers,
      }}>
      {children}
    </UsersListContext.Provider>
  );
};

export const useUsersListContext = () => useContext(UsersListContext);
