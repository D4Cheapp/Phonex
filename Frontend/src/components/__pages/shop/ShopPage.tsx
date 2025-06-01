import { Category } from '@/modules/category/type';
import { Product } from '@/modules/product/types';

import { Categories } from './Categories';
import { ShopProvider } from './context';
import { ProductList } from './ProductList';

type Props = {
  products: Product[];
  categories: Category[];
};

export const ShopPage = ({ products, categories }: Props) => {
  return (
    <ShopProvider initialProducts={products}>
      <Categories categories={categories} />
      <ProductList />
    </ShopProvider>
  );
};
