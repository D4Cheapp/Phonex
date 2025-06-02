import { Shop } from '@/modules/shop/types';
import { createUser } from '@/modules/user/create-user';
import { User } from '@/modules/user/types';
import { updateProfile } from '@/modules/user/update-profile';
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Select,
  SelectItem,
} from '@heroui/react';
import { useForm } from 'react-hook-form';

import { FormEvent } from 'react';

type Props = {
  user?: User;
  shops: Shop[] | null;
  isOpen: boolean;
  onClose: () => void;
};

export const EditProfileModal = ({ isOpen, user, shops, onClose }: Props) => {
  const form = useForm({
    defaultValues: {
      name: user?.name,
      email: user?.email,
      shopId: user?.shop?.id,
      roleId: user?.role.id,
      password: undefined,
    },
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    form.handleSubmit(async data => {
      if (!user) {
        const isRequiredFieldsEmpty = !data.name || !data.email || !data.roleId;
        if (isRequiredFieldsEmpty) return;

        await createUser({
          name: data.name?.toString() || '',
          email: data.email?.toString() || '',
          shopId: data.shopId ? Number(data.shopId) : undefined,
          roleId: Number(data.roleId),
          password: data.password!,
        });
        onClose();
        return;
      }

      await updateProfile({
        id: user.id,
        name: data.name?.toString() || '',
        email: data.email?.toString() || '',
        shopId: data.shopId ? data.shopId : undefined,
        roleId: Number(data.roleId),
        password: data.password,
      });
    })();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="3xl">
      <ModalContent>
        <ModalHeader>
          <p className="text-xl font-semibold">Редактирование профиля</p>
        </ModalHeader>
        <ModalBody>
          <form className="flex flex-col gap-3 mt-10 mb-10" onSubmit={handleSubmit}>
            <div className="flex gap-5">
              <Input
                label="Имя"
                required={!!user?.id}
                variant="bordered"
                {...form.register('name')}
              />
              <Input
                label="Email"
                required={!!user?.id}
                variant="bordered"
                {...form.register('email')}
              />
            </div>
            <div className="flex gap-5">
              {shops && (
                <Select
                  label="Магазин"
                  variant="bordered"
                  defaultSelectedKeys={[user?.shop.id.toString() || '']}
                  {...form.register('shopId')}>
                  {shops?.map(shop => <SelectItem key={shop.id}>{shop.name}</SelectItem>)}
                </Select>
              )}
              <Select
                label="Роль"
                variant="bordered"
                required={!!user?.id}
                defaultSelectedKeys={[user?.role.id.toString() || '']}
                {...form.register('roleId')}>
                <SelectItem key="1">Администратор</SelectItem>
                <SelectItem key="2">Менеджер</SelectItem>
                <SelectItem key="3">Кассир</SelectItem>
              </Select>
            </div>
            <Input
              label="Пароль"
              variant="bordered"
              {...form.register('password')}
              required={!user?.id}
            />
            <div className="flex justify-around gap-5 mt-10">
              <Button className="w-1/3" color="primary" type="submit">
                Сохранить
              </Button>
              <Button className="w-1/3" color="danger" onPress={onClose}>
                Закрыть
              </Button>
            </div>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
