'use client';

import { getProducts } from '@/modules/product/get-products';
import { Product } from '@/modules/product/types';

import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';

type ShopContextType = {
  products: Product[];
  category?: number;
  setCategory: Dispatch<SetStateAction<number | undefined>>;
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
};

type Props = {
  children: React.ReactNode;
  initialProducts: Product[];
};

const ShopContext = createContext({} as ShopContextType);

export const ShopProvider = ({ children, initialProducts }: Props) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<number | undefined>();

  const fetchProducts = async () => {
    const response = await getProducts({ category: category, search });
    setProducts([]);
    setProducts(response || []);
  };

  useEffect(() => {
    fetchProducts();
  }, [category, search]);

  return (
    <ShopContext.Provider value={{ products, category, setCategory, search, setSearch }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShopContext = () => useContext(ShopContext);
