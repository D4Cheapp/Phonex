import { getCategories } from '@/modules/category/get-categories';
import { CategoryListPage } from 'pages/category-list/CategoryListPage';

const Page = async () => {
  const categories = await getCategories();

  return <CategoryListPage initialCategories={categories} />;
};

export default Page;
