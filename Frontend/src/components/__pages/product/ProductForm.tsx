'use client';

import { Button, Input } from '@heroui/react';
import { useAuthContext } from 'components/Auth/context';
import { ConfirmModal } from 'components/Modals/ConfirmModal';
import { Roles } from 'constants/roles';
import { Routes } from 'constants/routes';
import { FormProvider, useForm } from 'react-hook-form';
import { getImageSrc } from 'utils/get-image-href';

import { useState } from 'react';

import Link from 'next/link';

import { useProductContext } from './context';
import { ProductCharacteristics } from './ProductCharacteristics';
import { ProductInfo } from './ProductInfo';

export const ProductForm = () => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const { product, isEditable, isCreating, onDelete } = useProductContext();

  const { user } = useAuthContext();

  const form = useForm({
    defaultValues: {
      name: product?.name,
      description: product?.description,
      price: product?.price.toString(),
      image: product?.image,
    },
  });

  return (
    <FormProvider {...form}>
      <form className="flex flex-col gap-10 max-w-[1024px] max-md:w-full mx-auto mt-10 items-center">
        <div className="flex gap-5 w-full max-md:max-w-full justify-between max-md:flex-col">
          {isCreating || isEditable ? (
            <Input
              classNames={{
                base: 'w-full',
              }}
              type="file"
              label="Изображение"
              variant="bordered"
              {...form.register('image')}
            />
          ) : (
            <img
              className="w-96 h-96 max-md:w-full max-md:h-auto object-cover rounded-md border-medium"
              src={product?.image ? getImageSrc(product?.image) : ''}
              alt={product?.name}
            />
          )}
          <ProductInfo />
        </div>
        <ProductCharacteristics />
        {user?.id && (user.role.name === Roles.ADMIN || user.role.name === Roles.MANAGER) && (
          <div className="w-full flex gap-5 justify-end">
            <Link href={`${Routes.productCreation}/${product?.id}/edit`}>
              <Button className="w-[150px]" color="primary" type="button">
                Изменить
              </Button>
            </Link>
            <Button
              className="w-[150px]"
              color="danger"
              type="button"
              onPress={() => setIsConfirmOpen(true)}>
              Удалить
            </Button>
            <ConfirmModal
              title="Удаление продукта"
              description="Вы уверены, что хотите удалить этот продукт?"
              isOpen={isConfirmOpen}
              onClose={() => setIsConfirmOpen(false)}
              onConfirm={onDelete}
            />
          </div>
        )}
      </form>
    </FormProvider>
  );
};
