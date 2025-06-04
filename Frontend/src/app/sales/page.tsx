import { getProducts } from '@/modules/product/get-products';
import { getSales } from '@/modules/sales/get-sales';
import { getShopList } from '@/modules/shop/get-shop-list';
import { getCurrentUser } from '@/modules/user/get-current-user';
import { SalePage } from 'pages/sales/SalePage';

const Page = async () => {
  const currentUser = await getCurrentUser();
  const shops = await getShopList({});

  const sales = await getSales({ shopId: currentUser?.shop.id || '' });
  const products = await getProducts({});

  return (
    <SalePage
      initialSales={sales || []}
      initialShops={shops || []}
      initialProducts={products || []}
    />
  );
};

export default Page;
