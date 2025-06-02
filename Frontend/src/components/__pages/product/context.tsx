'use client';

import { deleteProduct } from '@/modules/product/delete-product';
import { Product } from '@/modules/product/types';
import { Routes } from 'constants/routes';

import { createContext, useContext } from 'react';

import { redirect } from 'next/navigation';

type ProductContextType = {
  isEditable?: boolean;
  isCreating?: boolean;
  product?: Product;
  onDelete: () => void;
};

const ProductContext = createContext({} as ProductContextType);

type Props = {
  children: React.ReactNode;
  isEditable?: boolean;
  isCreating?: boolean;
  product?: Product;
};

export const ProductProvider = ({ children, isEditable, isCreating, product }: Props) => {
  const onDelete = async () => {
    if (!product?.id) return;

    await deleteProduct(product.id.toString());
    return redirect(Routes.home);
  };

  return (
    <ProductContext.Provider value={{ isEditable, isCreating, product, onDelete }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => useContext(ProductContext);
