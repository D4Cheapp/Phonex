'use client';

import { getShopList } from '@/modules/shop/get-shop-list';
import { Shop } from '@/modules/shop/types';

import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';

type ShopListContextType = {
  shops: Shop[] | null;
  selectedShop: Shop | undefined;
  setName: Dispatch<SetStateAction<string | undefined>>;
  setAddress: Dispatch<SetStateAction<string | undefined>>;
  setShops: Dispatch<SetStateAction<Shop[]>>;
  setSelectedShop: Dispatch<SetStateAction<Shop | undefined>>;
  isEditShopModalOpen: boolean;
  setIsEditShopModalOpen: Dispatch<SetStateAction<boolean>>;
  isConfirmModalOpen: boolean;
  setIsConfirmModalOpen: Dispatch<SetStateAction<boolean>>;
  isAddShopModalOpen: boolean;
  setIsAddShopModalOpen: Dispatch<SetStateAction<boolean>>;
};

const ShopListContext = createContext({} as ShopListContextType);

type Props = {
  children: React.ReactNode;
  initialShop: Shop[] | null;
};

export const ShopListProvider = ({ children, initialShop }: Props) => {
  const [shops, setShops] = useState<Shop[]>(initialShop || []);
  const [selectedShop, setSelectedShop] = useState<Shop | undefined>();
  const [isEditShopModalOpen, setIsEditShopModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isAddShopModalOpen, setIsAddShopModalOpen] = useState(false);
  const [name, setName] = useState<string | undefined>();
  const [address, setAddress] = useState<string | undefined>();

  const fetchShop = async () => {
    const response = await getShopList({ name, address });
    setShops([]);
    setShops(response || []);
  };

  useEffect(() => {
    fetchShop();
  }, [name, address]);

  return (
    <ShopListContext.Provider
      value={{
        shops,
        selectedShop,
        setName,
        setAddress,
        setShops,
        setSelectedShop,
        isAddShopModalOpen,
        setIsAddShopModalOpen,
        isEditShopModalOpen,
        setIsEditShopModalOpen,
        isConfirmModalOpen,
        setIsConfirmModalOpen,
      }}>
      {children}
    </ShopListContext.Provider>
  );
};

export const useShopListContext = () => useContext(ShopListContext);
