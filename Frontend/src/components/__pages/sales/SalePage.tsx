'use client';

import { Product } from '@/modules/product/types';
import { Sale } from '@/modules/sales/types';
import { Shop } from '@/modules/shop/types';

import { SaleForm } from './SaleForm';
import { SalesProvider } from './SalesContext';
import { SalesHistory } from './SalesHistory';

type Props = {
  initialSales: Sale[];
  initialShops: Shop[];
  initialProducts: Product[];
};

export const SalePage = ({ initialSales, initialShops, initialProducts }: Props) => {
  return (
    <SalesProvider
      initialSales={initialSales}
      initialShops={initialShops}
      initialProducts={initialProducts}>
      <SalePageContent />
    </SalesProvider>
  );
};

const SalePageContent = () => {
  return (
    <div className="flex flex-col gap-2 p-2">
      <div className="mb-7">
        <h1 className="text-3xl font-bold mb-3 mt-5">Продажи</h1>
        <p className="text-gray-500">Управление продажами в ваших магазинах</p>
      </div>
      <div>
        <SaleForm />
        <SalesHistory />
      </div>
    </div>
  );
};
