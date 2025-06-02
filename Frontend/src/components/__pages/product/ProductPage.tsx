'use client';

import { Category } from '@/modules/category/type';
import { Product } from '@/modules/product/types';

import { ProductProvider } from './context';
import { ProductForm } from './ProductForm';

type Props = {
  isCreating?: boolean;
  isEditable?: boolean;
  product?: Product;
  categories?: Category[];
};
export const ProductPage = ({ isEditable, isCreating, product, categories }: Props) => (
  <ProductProvider
    isEditable={isEditable}
    initialProduct={product}
    isCreating={isCreating}
    categories={categories}>
    <ProductForm />
  </ProductProvider>
);
