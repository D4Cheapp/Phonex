'use client';

import { handleRoleName } from '@/modules/user/handle-role-name';
import { User } from '@/modules/user/types';
import { Button } from '@heroui/react';

import DeleteIcon from 'icons/delete.svg';

import { useUsersListContext } from './context';

export const UserListItem = ({ user }: { user: User }) => {
  const { setSelectedUser, setIsEditProfileModalOpen, setIsConfirmModalOpen } =
    useUsersListContext();

  const handleSelectUser = () => {
    setSelectedUser(user);
    setIsEditProfileModalOpen(true);
  };

  const handleDeleteUser = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedUser(user);
    setIsConfirmModalOpen(true);
  };

  return (
    <div
      onClick={handleSelectUser}
      className="grid [grid-template-columns:1fr_1fr_1fr_1fr_1.5rem] items-center max-md:[grid-template-columns:1fr_1fr] max-md:gap-6 p-4 pl-10 pr-10 max-md:pl-5 max-md:pr-5 gap-4 border-medium shadow-sm rounded-xl hover:bg-gray-100 transition-all cursor-pointer">
      <div>
        <p className="text-gray-500 hidden max-md:block">Имя</p>
        <p>{user.name}</p>
      </div>
      <div>
        <p className="text-gray-500 hidden max-md:block">Почта</p>
        <p>{user.email}</p>
      </div>
      <div>
        <p className="text-gray-500 hidden max-md:block">Роль</p>
        <p>{handleRoleName(user.role.name)}</p>
      </div>
      {user.shop && (
        <div>
          <p className="text-gray-500 hidden max-md:block">Магазин</p>
          <p>{user.shop.name}</p>
        </div>
      )}
      <span className="cursor-pointer max-md:hidden" onClick={handleDeleteUser}>
        <DeleteIcon className="w-6 h-6" />
      </span>
      <Button
        className="col-span-full mt-5 hidden max-md:block"
        color="danger"
        variant="bordered"
        onClick={handleDeleteUser}>
        Удалить
      </Button>
    </div>
  );
};
