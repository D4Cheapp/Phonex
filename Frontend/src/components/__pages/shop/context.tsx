'use client';

import { getProducts } from '@/modules/product/get-products';
import { Product } from '@/modules/product/types';

import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';

type ShopContextType = {
  products: Product[];
  categoryId?: number;
  setCategoryId: Dispatch<SetStateAction<number | undefined>>;
};

type Props = {
  children: React.ReactNode;
  initialProducts: Product[];
};

const ShopContext = createContext({} as ShopContextType);

export const ShopProvider = ({ children, initialProducts }: Props) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [categoryId, setCategoryId] = useState<number | undefined>();

  const fetchProducts = async () => {
    const response = await getProducts({ category: categoryId });
    setProducts([]);
    setProducts(response || []);
  };

  useEffect(() => {
    fetchProducts();
  }, [categoryId]);

  return (
    <ShopContext.Provider value={{ products, categoryId, setCategoryId }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShopContext = () => useContext(ShopContext);
