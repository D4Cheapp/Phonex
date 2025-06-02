import { getProductById } from '@/modules/product/get-product';
import { Routes } from 'constants/routes';
import { ProductPage } from 'pages/product/ProductPage';

import { redirect } from 'next/navigation';

type Props = {
  params: {
    id: string;
  };
};
const Page = async ({ params }: Props) => {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product?.id) redirect(Routes.home);

  return <ProductPage product={product} />;
};

export default Page;
