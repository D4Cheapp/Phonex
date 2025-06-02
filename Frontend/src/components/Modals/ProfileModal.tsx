import { handleRoleName } from '@/modules/user/handle-role-name';
import { logout } from '@/modules/user/logout';
import { User } from '@/modules/user/types';
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/react';
import { Routes } from 'constants/routes';

import { redirect } from 'next/navigation';

type Props = {
  user: User;
  isOpen: boolean;
  onClose: () => void;
};

export const ProfileModal = ({ user, isOpen, onClose }: Props) => {
  const handleLogout = async () => {
    await logout();
    redirect(Routes.login);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>
          <p className="text-xl font-semibold">Профиль пользователя</p>
        </ModalHeader>
        <ModalBody className="pt-5 pb-5 flex flex-col gap-8">
          <div className="w-full flex gap-2">
            <p className="font-semibold">Имя пользователя: </p>
            <p>{user.name}</p>
          </div>
          <div className="w-full flex gap-2">
            <p className="font-semibold">Электронная почта: </p>
            <p>{user.email}</p>
          </div>
          {user.shop && (
            <div className="w-full flex gap-2">
              <p className="font-semibold">Магазин: </p>
              <p>{user.shop.name}</p>
            </div>
          )}
          <div className="w-full flex gap-2">
            <p className="font-semibold">Роль: </p>
            <p>{handleRoleName(user.role.name)}</p>
          </div>
        </ModalBody>
        <ModalFooter className="flex justify-center">
          <Button className="w-1/2" color="danger" onPress={handleLogout}>
            Выйти из аккаунта
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
