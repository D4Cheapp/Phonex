'use client';

import { Product } from '@/modules/product/types';

import { ProductProvider } from './context';
import { ProductForm } from './ProductForm';

type Props = {
  isCreating?: boolean;
  isEditable?: boolean;
  product?: Product;
};
export const ProductPage = ({ isEditable, isCreating, product }: Props) => (
  <ProductProvider isEditable={isEditable} product={product} isCreating={isCreating}>
    <ProductForm />
  </ProductProvider>
);
