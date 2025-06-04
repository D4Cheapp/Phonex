'use client';

import { Product } from '@/modules/product/types';
import { createSale } from '@/modules/sales/create-sale';
import { getSales } from '@/modules/sales/get-sales';
import { Sale } from '@/modules/sales/types';
import { Shop } from '@/modules/shop/types';
import { useAuthContext } from 'components/Auth/context';

import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

type SalesContextType = {
  sales: Sale[];
  selectedShopId: string;
  setSelectedShopId: (id: string) => void;
  shops: Shop[];
  products: Product[];
  fetchSales: (shopId: string) => Promise<void>;
  createSaleHandler: (
    shopId: string,
    products: { productId: string; quantity: number }[]
  ) => Promise<void>;
};

const SalesContext = createContext<SalesContextType | undefined>(undefined);

type Props = {
  children: ReactNode;
  initialSales: Sale[];
  initialShops: Shop[];
  initialProducts: Product[];
};

export const SalesProvider = ({ children, initialSales, initialShops, initialProducts }: Props) => {
  const [sales, setSales] = useState<Sale[]>(initialSales || []);
  const [selectedShopId, setSelectedShopId] = useState<string>('');

  const { user } = useAuthContext();

  const fetchSales = async (shopId: string) => {
    try {
      const data = await getSales({ shopId });
      setSales(data || []);
    } catch (error) {
      console.error('Error fetching sales:', error);
      throw error;
    }
  };

  const createSaleHandler = async (
    shopId: string,
    products: { productId: string; quantity: number }[]
  ) => {
    if (!user) return;

    try {
      await createSale({
        userId: user.id.toString(),
        shopId,
        products: products.map(p => ({
          productId: p.productId,
          quantity: Number(p.quantity) || 1,
        })),
      });
      await fetchSales(shopId);
    } catch (error) {
      console.error('Error creating sale:', error);
      throw error;
    }
  };

  useEffect(() => {
    if (selectedShopId) {
      fetchSales(selectedShopId);
    }
  }, [selectedShopId]);

  return (
    <SalesContext.Provider
      value={{
        sales,
        selectedShopId,
        setSelectedShopId,
        shops: initialShops,
        products: initialProducts,
        fetchSales,
        createSaleHandler,
      }}>
      {children}
    </SalesContext.Provider>
  );
};

export const useSales = () => {
  const context = useContext(SalesContext);
  if (context === undefined) {
    throw new Error('useSales must be used within a SalesProvider');
  }
  return context;
};
