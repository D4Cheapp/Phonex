'use client';

import { getSupplierProducts } from '@/modules/product/get-suppliers-products';
import { Product } from '@/modules/product/types';
import { Shop } from '@/modules/shop/types';
import { Supplier } from '@/modules/suppliers/types';
import { createSupply } from '@/modules/supplies/create-supply';
import { Supply, SupplyItem } from '@/modules/supplies/types';
import { updateSupply } from '@/modules/supplies/update-supply';
import { Button, Select, SelectItem } from '@heroui/react';
import { Routes } from 'constants/routes';
import { SupplyStatusE } from 'constants/supply-status';
import { FormProvider, useForm } from 'react-hook-form';

import { useEffect, useState } from 'react';

import Link from 'next/link';

import { SupplyItemList } from './SupplyItemList';

type Props = {
  isCreating?: boolean;
  initialSupply?: Supply;
  initialProducts: Product[];
  shops: Shop[];
};

export const SupplyForm = ({ isCreating, initialSupply, initialProducts, shops }: Props) => {
  const [selectedProducts, setSelectedProducts] = useState<(Product & { quantity: number })[]>(
    initialSupply?.supplyItems?.map(item => ({
      ...item.product,
      quantity: item.quantity,
    })) || []
  );
  const [products, setProducts] = useState<Product[]>(initialProducts || []);
  const [shopId, setShopId] = useState<string | undefined>();
  const [supplier, setSupplier] = useState<Supplier | undefined>(
    initialSupply?.supplier ?? undefined
  );

  const form = useForm({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: {
      shopId: initialSupply?.shop.id || '',
      statusId: initialSupply?.supply_status.id || '',
      supplyItems: initialSupply?.supplyItems || [],
    },
  });

  const handleSubmit = form.handleSubmit(async data => {
    if (isCreating) {
      if (!shopId || !data.statusId || !supplier) return;

      const supplyItems: SupplyItem[] = selectedProducts.map(product => ({
        product: product,
        quantity: product.quantity,
      }));

      await createSupply({
        shopId: shopId,
        supplierId: supplier?.id.toString() || '',
        supplyStatusId: data.statusId,
        supplyItems: supplyItems,
      });

      return;
    }

    if (!initialSupply?.id || !data.statusId) return;

    await updateSupply({
      id: initialSupply.id,
      supplyStatusId: data.statusId,
    });
  });

  const fetchSupplierProducts = async () => {
    if (!shopId) return;

    const productId = selectedProducts[0].id.toString();
    const supplierProducts = await getSupplierProducts({ productId, shopId });

    if (!supplierProducts || !supplierProducts.products.length) return;

    setProducts(supplierProducts.products);
    setSupplier(supplierProducts.supplier);
  };

  useEffect(() => {
    if (selectedProducts.length === 1 && shopId) {
      fetchSupplierProducts();
    }
  }, [selectedProducts, shopId]);

  return (
    <>
      <h1 className="text-3xl font-bold mb-10 mt-8">
        {isCreating ? 'Создание поставки' : 'Редактирование поставки'}
      </h1>
      <FormProvider {...form}>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-5">
          <div className="col-span-2 space-y-4 mb-5">
            <h2 className="text-xl font-semibold">Поставщик</h2>
            {supplier ? (
              <div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Поставщик:</span>
                    <p>{supplier?.name}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Email:</span>
                    <p>{supplier?.email}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Телефон:</span>
                    <p>{supplier?.phone}</p>
                  </div>
                </div>
                <Link
                  href={Routes.productSuppliers + `/${supplier?.id}`}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium border-medium border-primary text-primary rounded-xl hover:bg-primary/90 hover:text-white transition-colors mt-5">
                  Перейти на страницу поставщика
                </Link>
              </div>
            ) : (
              <p className="text-gray-600">Выберите товар, чтобы определить поставщика</p>
            )}
          </div>
          <Select
            label="Магазин"
            variant="bordered"
            {...form.register('shopId')}
            isDisabled={!isCreating}>
            {(shops ?? []).map(shop => (
              <SelectItem key={shop.id} onClick={() => setShopId(shop.id)}>
                {shop.name}
              </SelectItem>
            ))}
          </Select>
          <Select
            label="Статус"
            variant="bordered"
            {...form.register('statusId')}
            isDisabled={
              !!(initialSupply?.id && initialSupply?.supply_status.name !== SupplyStatusE.PENDING)
            }>
            <SelectItem key="1">В обработке</SelectItem>
            <SelectItem key="2">Завершен</SelectItem>
            <SelectItem key="3">Отменен</SelectItem>
          </Select>
          <SupplyItemList
            isCreating={isCreating}
            products={products}
            selectedProducts={selectedProducts}
            setSelectedProducts={setSelectedProducts}
          />
          {(initialSupply?.supply_status.name === SupplyStatusE.PENDING || !initialSupply?.id) && (
            <Button type="submit" color="primary" className="col-span-2 mt-10">
              Сохранить
            </Button>
          )}
        </form>
      </FormProvider>
    </>
  );
};
