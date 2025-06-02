import { Category } from '@/modules/category/type';
import { Product } from '@/modules/product/types';

import { ShopProvider } from './context';
import { ProductList } from './ProductList';
import { ShopCategories } from './ShopCategories';
import { ShopSearch } from './ShopSearch';

type Props = {
  products: Product[];
  categories: Category[];
};

export const ShopPage = ({ products, categories }: Props) => {
  return (
    <ShopProvider initialProducts={products}>
      <h1 className="text-3xl font-bold mb-10 mt-5">Товары сети магазинов</h1>
      <ShopSearch />
      <ShopCategories categories={categories} />
      <ProductList />
    </ShopProvider>
  );
};
