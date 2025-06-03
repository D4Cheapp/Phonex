import { getProducts } from '@/modules/product/get-products';
import { getShopList } from '@/modules/shop/get-shop-list';
import { getWarehouseProducts } from '@/modules/warehouse-products/get-wearehouse-products';
import { WarehousePage } from 'pages/warehouse/WarehousePage';

const Page = async () => {
  const warehouseProducts = await getWarehouseProducts({});
  const shops = await getShopList({});
  const products = await getProducts({});

  return (
    <WarehousePage
      warehouseProducts={warehouseProducts || []}
      shops={shops || []}
      products={products || []}
    />
  );
};

export default Page;
