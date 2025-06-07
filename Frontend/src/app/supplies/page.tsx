import { getShopList } from '@/modules/shop/get-shop-list';
import { getSuppliers } from '@/modules/suppliers/get-suppliers';
import { getSupplies } from '@/modules/supplies/get-supplies';
import { SuppliesPage } from 'pages/supplies/SuppliesPage';

const Page = async () => {
  const supplies = await getSupplies({});
  const shops = await getShopList({});
  const suppliers = await getSuppliers({});

  return <SuppliesPage supplies={supplies || []} shops={shops || []} suppliers={suppliers || []} />;
};

export default Page;
