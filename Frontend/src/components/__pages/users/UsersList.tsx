'use client';

import { Shop } from '@/modules/shop/types';
import { deleteUser } from '@/modules/user/delete-user';
import { ConfirmModal } from 'components/Modals/ConfirmModal';
import { EditProfileModal } from 'components/Modals/EditProfileModal';

import { useUsersListContext } from './context';
import { UserListItem } from './UserListItem';

type Props = {
  shops: Shop[] | null;
};

export const UsersList = ({ shops }: Props) => {
  const {
    users,
    setUsers,
    selectedUser,
    isEditProfileModalOpen,
    setIsEditProfileModalOpen,
    setSelectedUser,
    isConfirmModalOpen,
    setIsConfirmModalOpen,
  } = useUsersListContext();

  const handleCloseModal = () => {
    setIsEditProfileModalOpen(false);
    setSelectedUser(null);
  };

  const handleConfirmModalClose = () => {
    setIsConfirmModalOpen(false);
  };

  const handleConfirmModalConfirm = async () => {
    if (!selectedUser) return;
    await deleteUser(selectedUser.id);
    setUsers(prev => prev?.filter(user => user.id !== selectedUser.id));
    setIsConfirmModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <div className="flex flex-col gap-4 mt-10">
      <div className="grid [grid-template-columns:1fr_1fr_1fr_1fr_1.5rem] max-md:hidden pl-10 pr-10 max-md:pl-5 max-md:pr-5 gap-4">
        <p className="text-gray-500">Имя</p>
        <p className="text-gray-500">Почта</p>
        <p className="text-gray-500">Роль</p>
        <p className="text-gray-500">Магазин</p>
      </div>
      {users?.map(user => <UserListItem key={user.id} user={user} />)}
      {selectedUser && (
        <EditProfileModal
          isOpen={isEditProfileModalOpen}
          onClose={handleCloseModal}
          user={selectedUser}
          shops={shops}
        />
      )}
      <ConfirmModal
        title="Удаление пользователя"
        description="Вы уверены, что хотите удалить этого пользователя?"
        isOpen={isConfirmModalOpen}
        onClose={handleConfirmModalClose}
        onConfirm={handleConfirmModalConfirm}
      />
    </div>
  );
};
