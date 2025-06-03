'use client';

import { Shop } from '@/modules/shop/types';
import { Button } from '@heroui/react';
import { EditProfileModal } from 'components/Modals/EditProfileModal';

import { useUsersListContext } from './context';

type Props = {
  shops: Shop[] | null;
};

export const AddUserButton = ({ shops }: Props) => {
  const { isAddUserModalOpen, setIsAddUserModalOpen } = useUsersListContext();

  return (
    <>
      <Button color="primary" variant="bordered" onPress={() => setIsAddUserModalOpen(true)}>
        Добавить пользователя
      </Button>
      {isAddUserModalOpen && (
        <EditProfileModal
          isOpen={isAddUserModalOpen}
          onClose={() => setIsAddUserModalOpen(false)}
          shops={shops}
        />
      )}
    </>
  );
};
