'use client';

import { Select, SelectItem, Textarea } from '@heroui/react';
import { Input } from '@heroui/react';
import { useFormContext } from 'react-hook-form';

import { useProductContext } from './context';

export const ProductInfo = () => {
  const form = useFormContext();

  const { isEditable, isCreating, product, categories } = useProductContext();

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
      <Select
        classNames={{
          base: 'w-full',
        }}
        label="Категория"
        variant="bordered"
        {...form.register('product_category_id')}>
        {(categories ?? []).map(category => (
          <SelectItem key={category.id}>{category.name}</SelectItem>
        ))}
      </Select>
    </div>
  ) : (
    <div className="flex flex-col gap-5 max-w-96 min-w-96 max-md:w-full max-md:max-w-full">
      <h1 className="text-2xl break-words mb-5">{product?.name}</h1>
      <div>
        <h2 className="text-xl mb-3">Описание</h2>
        <p className="text-lg mb-5">{product?.description}</p>
      </div>
      <div>
        <h2 className="text-xl mb-3">Категория</h2>
        <p className="text-lg mb-5">{product?.product_category?.name}</p>
      </div>
      <p className="text-lg self-end">{product?.price} руб.</p>
    </div>
  );
};
