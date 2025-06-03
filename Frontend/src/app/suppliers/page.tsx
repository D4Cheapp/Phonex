import { getSuppliers } from '@/modules/suppliers/get-suppliers';

import { SupplierListPage } from '@/components/__pages/supplier-list/SupplierListPage';

const Page = async () => {
  const suppliers = await getSuppliers({});

  return <SupplierListPage initialSuppliers={suppliers ?? []} />;
};

export default Page;
