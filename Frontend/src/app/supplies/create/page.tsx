import { getProducts } from '@/modules/product/get-products';
import { getShopList } from '@/modules/shop/get-shop-list';
import { SupplyForm } from 'pages/supply/SupplyForm';

const Page = async () => {
  const shops = await getShopList({});
  const products = await getProducts({});

  return <SupplyForm isCreating shops={shops || []} products={products || []} />;
};

export default Page;
