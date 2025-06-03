'use client';

import { Product } from '@/modules/product/types';
import { Shop } from '@/modules/shop/types';
import { getWarehouseProducts } from '@/modules/warehouse-products/get-wearehouse-products';
import { WarehouseProduct } from '@/modules/warehouse-products/types';

import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';

type WarehouseListContextType = {
  shops: Shop[];
  products: Product[];
  warehouseProducts: WarehouseProduct[] | null;
  selectedWarehouseProduct: WarehouseProduct | undefined;
  setProductId: Dispatch<SetStateAction<string | undefined>>;
  setShopId: Dispatch<SetStateAction<string | undefined>>;
  setWarehouseProducts: Dispatch<SetStateAction<WarehouseProduct[]>>;
  setSelectedWarehouseProduct: Dispatch<SetStateAction<WarehouseProduct | undefined>>;
  isEditWarehouseProductModalOpen: boolean;
  setIsEditWarehouseProductModalOpen: Dispatch<SetStateAction<boolean>>;
  isConfirmModalOpen: boolean;
  setIsConfirmModalOpen: Dispatch<SetStateAction<boolean>>;
  isAddWarehouseProductModalOpen: boolean;
  setIsAddWarehouseProductModalOpen: Dispatch<SetStateAction<boolean>>;
};

const WarehouseListContext = createContext({} as WarehouseListContextType);

type Props = {
  children: React.ReactNode;
  shops: Shop[];
  products: Product[];
  initialWarehouseProducts: WarehouseProduct[] | null;
};

export const WarehouseListProvider = ({
  children,
  shops,
  products,
  initialWarehouseProducts,
}: Props) => {
  const [warehouseProducts, setWarehouseProducts] = useState<WarehouseProduct[]>(
    initialWarehouseProducts || []
  );
  const [selectedWarehouseProduct, setSelectedWarehouseProduct] = useState<
    WarehouseProduct | undefined
  >();
  const [isEditWarehouseProductModalOpen, setIsEditWarehouseProductModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isAddWarehouseProductModalOpen, setIsAddWarehouseProductModalOpen] = useState(false);
  const [productId, setProductId] = useState<string | undefined>();
  const [shopId, setShopId] = useState<string | undefined>();

  const fetchWarehouseProduct = async () => {
    const response = await getWarehouseProducts({ productId, shopId });
    setWarehouseProducts([]);
    setWarehouseProducts(response || []);
  };

  useEffect(() => {
    fetchWarehouseProduct();
  }, [productId, shopId]);

  return (
    <WarehouseListContext.Provider
      value={{
        shops,
        products,
        warehouseProducts,
        selectedWarehouseProduct,
        setProductId,
        setShopId,
        setWarehouseProducts,
        setSelectedWarehouseProduct,
        isAddWarehouseProductModalOpen,
        setIsAddWarehouseProductModalOpen,
        isEditWarehouseProductModalOpen,
        setIsEditWarehouseProductModalOpen,
        isConfirmModalOpen,
        setIsConfirmModalOpen,
      }}>
      {children}
    </WarehouseListContext.Provider>
  );
};

export const useWarehouseListContext = () => useContext(WarehouseListContext);
