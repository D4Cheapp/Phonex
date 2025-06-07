import { getCategories } from '@/modules/category/get-categories';
import { getProductById } from '@/modules/product/get-product';
import { Routes } from 'constants/routes';
import { ProductPage } from 'pages/product/ProductPage';

import { redirect } from 'next/navigation';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const Page = async ({ params }: Props) => {
  const { id } = await params;
  const product = await getProductById(id);
  const categories = await getCategories();

  if (!product?.id) redirect(Routes.home);

  return <ProductPage isEditable product={product} categories={categories ?? []} />;
};

export default Page;
