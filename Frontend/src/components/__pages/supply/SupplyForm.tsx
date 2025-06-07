'use client';

import { Product } from '@/modules/product/types';
import { Shop } from '@/modules/shop/types';
import { Supply } from '@/modules/supplies/types';
import { Button, Select, SelectItem } from '@heroui/react';
import { FormProvider, useForm } from 'react-hook-form';

import { SupplyItemList } from './SupplyItemList';

type Props = {
  isCreating?: boolean;
  initialSupply?: Supply;
  shops: Shop[];
  products: Product[];
};

export const SupplyForm = ({ isCreating, initialSupply, shops, products }: Props) => {
  const form = useForm({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: {
      supplierId: initialSupply?.supplier.id || '',
      shopId: initialSupply?.shop.id || '',
      statusId: initialSupply?.supply_status.id || '',
      supplyItems: initialSupply?.supplyItems || [],
    },
  });

  const handleSubmit = form.handleSubmit(data => {
    console.log(data);
  });

  return (
    <>
      <h1 className="text-3xl font-bold mb-10 mt-8">
        {isCreating ? 'Создание поставки' : 'Редактирование поставки'}
      </h1>
      <FormProvider {...form}>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-5">
          <Select label="Магазин" variant="bordered" {...form.register('shopId')}>
            {(shops ?? []).map(shop => (
              <SelectItem key={shop.id}>{shop.name}</SelectItem>
            ))}
          </Select>
          <Select label="Статус" variant="bordered" {...form.register('statusId')}>
            <SelectItem key="1">В обработке</SelectItem>
            <SelectItem key="2">Завершен</SelectItem>
            <SelectItem key="3">Отменен</SelectItem>
          </Select>
          <SupplyItemList />
          <Button type="submit" color="primary" className="col-span-2 mt-10">
            Сохранить
          </Button>
        </form>
      </FormProvider>
    </>
  );
};
