import { getProductSuppliers } from '@/modules/product-suppliers/get-product-suppliers';
import { getProducts } from '@/modules/product/get-products';
import { getShopList } from '@/modules/shop/get-shop-list';
import { getSupplier } from '@/modules/suppliers/get-supplier';
import { Routes } from 'constants/routes';
import { SupplierPage } from 'pages/supplier/SupplierPage';

import { redirect } from 'next/navigation';

type Props = {
  params: {
    id: string;
  };
};
const Page = async ({ params }: Props) => {
  const { id } = await params;

  const supplier = await getSupplier(id);
  const supplierProducts = await getProductSuppliers(id);

  const shops = await getShopList({});
  const products = await getProducts({});

  if (!supplier?.id) return redirect(Routes.home);

  return (
    <SupplierPage
      supplier={supplier}
      initialProducts={supplierProducts ?? []}
      shops={shops ?? []}
      shopProducts={products ?? []}
    />
  );
};

export default Page;
