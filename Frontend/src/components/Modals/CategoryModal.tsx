import { createCategory } from '@/modules/category/create-category';
import { Category } from '@/modules/category/type';
import { updateCategory } from '@/modules/category/update-category';
import { Button, Input, Modal, ModalBody, ModalContent, ModalHeader } from '@heroui/react';
import { useForm } from 'react-hook-form';

import { FormEvent } from 'react';

type Props = {
  category?: Category;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
};

export const CategoryModal = ({ isOpen, onClose, category, onSuccess }: Props) => {
  const form = useForm({
    defaultValues: {
      name: category?.name || '',
    },
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    form.handleSubmit(async data => {
      try {
        if (!category) {
          if (!data.name) return;
          await createCategory(data.name);
        } else {
          await updateCategory(category.id, data.name);
        }
        onSuccess?.();
        onClose();
      } catch (error) {
        console.error('Error saving category:', error);
      }
    })();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>{category ? 'Редактирование категории' : 'Создание категории'}</ModalHeader>
        <ModalBody>
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <Input label="Название" variant="bordered" {...form.register('name')} />
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
