'use client';

import { Category } from '@/modules/category/type';
import { createProduct } from '@/modules/product/create-product';
import { deleteProduct } from '@/modules/product/delete-product';
import { Product } from '@/modules/product/types';
import { updateProduct } from '@/modules/product/update-product';
import { Routes } from 'constants/routes';

import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';

import { redirect } from 'next/navigation';

type ProductContextType = {
  isEditable?: boolean;
  isCreating?: boolean;
  product?: Partial<Product>;
  categories?: Category[];
  setProduct: Dispatch<SetStateAction<Partial<Product> | undefined>>;
  onDelete: () => void;
  onSubmit: (data: Product) => void;
};

const ProductContext = createContext({} as ProductContextType);

type Props = {
  children: React.ReactNode;
  categories?: Category[];
  isEditable?: boolean;
  isCreating?: boolean;
  initialProduct?: Product;
};

export const ProductProvider = ({
  children,
  isEditable,
  isCreating,
  initialProduct,
  categories,
}: Props) => {
  const [product, setProduct] = useState<Partial<Product> | undefined>(initialProduct);

  const onDelete = async () => {
    if (!product?.id) return;

    await deleteProduct(product.id.toString());
    return redirect(Routes.home);
  };

  const onSubmit = async (data: Product) => {
    if (isCreating) {
      await createProduct({
        ...data,
        characteristics: product?.characteristics ?? [],
      }).then(res => redirect(Routes.productCreation + '/' + res?.id));
    }

    if (!product?.id) return;
    await updateProduct(product.id.toString(), {
      ...data,
      characteristics: product.characteristics ?? [],
    }).then(() => redirect(Routes.productCreation + '/' + product?.id));
  };

  return (
    <ProductContext.Provider
      value={{
        isEditable,
        isCreating,
        product,
        categories,
        setProduct,
        onDelete,
        onSubmit,
      }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => useContext(ProductContext);
