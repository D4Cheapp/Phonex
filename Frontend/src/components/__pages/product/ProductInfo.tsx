'use client';

import { Textarea } from '@heroui/react';
import { Input } from '@heroui/react';
import { useFormContext } from 'react-hook-form';

import { useProductContext } from './context';

export const ProductInfo = () => {
  const form = useFormContext();

  const { isEditable, isCreating, product } = useProductContext();

  return isCreating || isEditable ? (
    <div className="flex flex-col gap-5 max-w-96 w-96 max-md:w-full max-md:max-w-full">
      <Input
        classNames={{
          base: 'w-full',
        }}
        label="Название"
        variant="bordered"
        size="lg"
        {...form.register('name')}
      />
      <Textarea
        classNames={{
          base: 'w-full',
        }}
        label="Описание"
        variant="bordered"
        {...form.register('description')}
      />
      <Input
        classNames={{
          base: 'w-full',
        }}
        label="Цена"
        type="number"
        variant="bordered"
        {...form.register('price')}
      />
    </div>
  ) : (
    <div className="flex flex-col gap-5 max-w-96 w-96 max-md:w-full max-md:max-w-full">
      <h1 className="text-2xl break-words mb-5">{product?.name}</h1>
      <div>
        <h2 className="text-xl mb-3">Описание</h2>
        <p className="text-lg mb-5">{product?.description}</p>
      </div>
      <p className="text-lg self-end">{product?.price} руб.</p>
    </div>
  );
};
