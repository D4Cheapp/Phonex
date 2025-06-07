'use client';

import { Shop } from '@/modules/shop/types';
import { Supplier } from '@/modules/suppliers/types';
import { getSupplies } from '@/modules/supplies/get-supplies';
import { Supply } from '@/modules/supplies/types';

import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';

type SupplyListContextType = {
  supplies: Supply[];
  selectedSupply: Supply | undefined;
  setShopId: Dispatch<SetStateAction<string | undefined>>;
  setSupplierId: Dispatch<SetStateAction<string | undefined>>;
  setSupplyStatusId: Dispatch<SetStateAction<string | undefined>>;
  setSupplies: Dispatch<SetStateAction<Supply[]>>;
  setSelectedSupply: Dispatch<SetStateAction<Supply | undefined>>;
  shops: Shop[];
  suppliers: Supplier[];
};

const SupplyListContext = createContext({} as SupplyListContextType);

type Props = {
  children: React.ReactNode;
  initialSupply: Supply[];
  shops: Shop[];
  suppliers: Supplier[];
};

export const SupplyListProvider = ({ children, initialSupply, shops, suppliers }: Props) => {
  const [supplies, setSupplies] = useState<Supply[]>(initialSupply || []);
  const [selectedSupply, setSelectedSupply] = useState<Supply | undefined>();
  const [shopId, setShopId] = useState<string | undefined>();
  const [supplierId, setSupplierId] = useState<string | undefined>();
  const [supplyStatusId, setSupplyStatusId] = useState<string | undefined>();

  const fetchSupply = async () => {
    const response = await getSupplies({ shopId, supplierId, supplyStatusId });
    setSupplies([]);
    setSupplies(response || []);
  };

  useEffect(() => {
    fetchSupply();
  }, [shopId, supplierId, supplyStatusId]);

  return (
    <SupplyListContext.Provider
      value={{
        supplies,
        selectedSupply,
        setShopId,
        setSupplierId,
        setSupplyStatusId,
        setSupplies,
        setSelectedSupply,
        shops,
        suppliers,
      }}>
      {children}
    </SupplyListContext.Provider>
  );
};

export const useSupplyListContext = () => useContext(SupplyListContext);
