'use client';

import { Category } from '@/modules/category/type';
import { Product } from '@/modules/product/types';
import { Button } from '@heroui/react';
import { useAuthContext } from 'components/Auth/context';
import { Roles } from 'constants/roles';
import { Routes } from 'constants/routes';

import { useRouter } from 'next/navigation';

import { ShopProvider } from './context';
import { ProductList } from './ProductList';
import { ShopCategories } from './ShopCategories';
import { ShopSearch } from './ShopSearch';

type Props = {
  products: Product[];
  categories: Category[];
};

export const ShopPage = ({ products, categories }: Props) => {
  const { user } = useAuthContext();

  const { push } = useRouter();

  return (
    <ShopProvider initialProducts={products}>
      <div className="flex justify-between items-start gap-5 mb-10 mt-10">
        <h1 className="text-3xl font-bold">Товары сети магазинов</h1>
        {(user?.role.name === Roles.ADMIN || user?.role.name === Roles.MANAGER) && (
          <Button color="primary" onPress={() => push(Routes.productCreation)}>
            Добавить товар
          </Button>
        )}
      </div>
      <ShopSearch />
      <ShopCategories categories={categories} />
      <ProductList />
    </ShopProvider>
  );
};
