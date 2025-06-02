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
        isOpen={isConfirmModalOpen}
        onClose={handleConfirmModalClose}
        onConfirm={handleConfirmModalConfirm}
      />
    </div>
  );
};
