'use client';

import { handleRoleName } from '@/modules/user/handle-role-name';
import { User } from '@/modules/user/types';

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
      className="flex justify-between items-center p-4 pl-10 pr-10 max-md:pl-5 max-md:pr-5 gap-4 border-medium shadow-sm rounded-xl hover:bg-gray-100 transition-all cursor-pointer">
      <div>
        <p>{user.name}</p>
        <p className="text-gray-500">{user.email}</p>
      </div>
      <div className="flex gap-6">
        {user.shop && <p className="text-gray-500">{user.shop.name}</p>}
        <p className="text-gray-500">{handleRoleName(user.role.name)}</p>
        <span className="cursor-pointer" onClick={handleDeleteUser}>
          <DeleteIcon className="w-6 h-6" />
        </span>
      </div>
    </div>
  );
};
