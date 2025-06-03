import { createSupplier } from '@/modules/suppliers/create-supplier';
import { Supplier } from '@/modules/suppliers/types';
import { updateSupplier } from '@/modules/suppliers/update-supplier';
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Textarea,
} from '@heroui/react';
import { useForm } from 'react-hook-form';

import { FormEvent } from 'react';

type Props = {
  supplier?: Supplier;
  isOpen: boolean;
  onClose: () => void;
};

export const SupplierModal = ({ isOpen, onClose, supplier }: Props) => {
  const form = useForm({
    defaultValues: {
      name: supplier?.name || '',
      email: supplier?.email || '',
      phone: supplier?.phone || '',
      description: supplier?.description || '',
    },
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    form.handleSubmit(async data => {
      if (!supplier) {
        const isRequiredFieldsEmpty = !data.name || !data.email || !data.phone || !data.description;
        if (isRequiredFieldsEmpty) return;

        await createSupplier({
          name: data.name?.toString() || '',
          email: data.email?.toString() || '',
          phone: data.phone?.toString() || '',
          description: data.description?.toString() || '',
        });
        onClose();
        return;
      }

      await updateSupplier({
        id: supplier.id,
        name: data.name?.toString() || '',
        email: data.email?.toString() || '',
        phone: data.phone?.toString() || '',
        description: data.description?.toString() || '',
      });
      onClose();
    })();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>Поставщик</ModalHeader>
        <ModalBody>
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <Input
              label="Имя"
              required={!!supplier?.id}
              variant="bordered"
              {...form.register('name')}
            />
            <Input
              label="Почта"
              required={!!supplier?.id}
              variant="bordered"
              {...form.register('email')}
            />
            <Input
              label="Телефон"
              required={!!supplier?.id}
              variant="bordered"
              {...form.register('phone')}
            />
            <Textarea
              label="Описание"
              required={!!supplier?.id}
              variant="bordered"
              {...form.register('description')}
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
