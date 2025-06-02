import { getShopList } from '@/modules/shop/get-shop-list';

import { ShopListPage } from '@/components/__pages/shop-list/ShopListPage';

const Page = async () => {
  const shops = await getShopList({});

  return <ShopListPage initialShop={shops} />;
};

export default Page;
