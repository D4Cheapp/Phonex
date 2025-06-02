import { createShop } from '@/modules/shop/create-shop';
import { Shop } from '@/modules/shop/types';
import { updateShop } from '@/modules/shop/update-shop';
import { Button, Input, Modal, ModalBody, ModalContent, ModalHeader } from '@heroui/react';
import { useForm } from 'react-hook-form';

import { FormEvent } from 'react';

type Props = {
  shop?: Shop;
  isOpen: boolean;
  onClose: () => void;
};

export const ShopModal = ({ isOpen, onClose, shop }: Props) => {
  const form = useForm({
    defaultValues: {
      name: shop?.name || '',
      address: shop?.address || '',
    },
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    form.handleSubmit(async data => {
      if (!shop) {
        const isRequiredFieldsEmpty = !data.name || !data.address;
        if (isRequiredFieldsEmpty) return;

        await createShop({
          name: data.name?.toString() || '',
          address: data.address?.toString() || '',
        });
        onClose();
        return;
      }

      await updateShop({
        id: shop.id,
        name: data.name?.toString() || '',
        address: data.address?.toString() || '',
      });
    })();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>Магазин</ModalHeader>
        <ModalBody>
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <Input
              label="Название"
              required={!!shop?.id}
              variant="bordered"
              {...form.register('name')}
            />
            <Input
              label="Адрес"
              required={!!shop?.id}
              variant="bordered"
              {...form.register('address')}
            />
            <div className="flex justify-around gap-5 mt-5 mb-5">
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
