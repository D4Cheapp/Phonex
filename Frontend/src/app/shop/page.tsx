import { getCategories } from '@/modules/category/get-categories';
import { getProducts } from '@/modules/product/get-products';
import { ShopPage } from 'pages/shop/ShopPage';

const Page = async () => {
  const products = await getProducts({});
  const categories = await getCategories();

  return <ShopPage products={products || []} categories={categories || []} />;
};

export default Page;
