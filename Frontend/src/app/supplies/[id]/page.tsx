import { getProducts } from '@/modules/product/get-products';
import { getShopList } from '@/modules/shop/get-shop-list';
import { getSupply } from '@/modules/supplies/get-supply';
import { SupplyForm } from 'pages/supply/SupplyForm';

type Props = {
  params: Promise<{ id: string }>;
};

const Page = async ({ params }: Props) => {
  const { id } = await params;

  const shops = await getShopList({});
  const products = await getProducts({});
  const supply = await getSupply(id);

  return <SupplyForm shops={shops || []} initialProducts={products || []} initialSupply={supply} />;
};

export default Page;
