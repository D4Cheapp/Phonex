import { Supplier } from '@/modules/suppliers/types';

import { AddSupplierButton } from './AddSupplierButton';
import { SupplierListProvider } from './context';
import { SupplierFilter } from './SupplierFilter';
import { SupplierList } from './SupplierList';

type Props = {
  initialSuppliers: Supplier[];
};

export const SupplierListPage = ({ initialSuppliers }: Props) => {
  return (
    <SupplierListProvider initialSupplier={initialSuppliers}>
      <div className="flex justify-between items-start gap-5 mb-10 mt-10">
        <h1 className="text-3xl font-bold">Список поставщиков</h1>
        <AddSupplierButton />
      </div>
      <SupplierFilter />
      <SupplierList />
    </SupplierListProvider>
  );
};
