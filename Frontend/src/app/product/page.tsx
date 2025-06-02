import { getCategories } from '@/modules/category/get-categories';
import { ProductPage } from 'pages/product/ProductPage';

const Page = async () => {
  const categories = await getCategories();

  return <ProductPage isCreating categories={categories ?? []} />;
};

export default Page;
