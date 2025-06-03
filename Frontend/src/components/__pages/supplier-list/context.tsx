'use client';

import { getSuppliers } from '@/modules/suppliers/get-suppliers';
import { Supplier } from '@/modules/suppliers/types';

import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';

type SupplierListContextType = {
  suppliers: Supplier[] | null;
  selectedSupplier: Supplier | undefined;
  setName: Dispatch<SetStateAction<string | undefined>>;
  setEmail: Dispatch<SetStateAction<string | undefined>>;
  setSuppliers: Dispatch<SetStateAction<Supplier[]>>;
  setSelectedSupplier: Dispatch<SetStateAction<Supplier | undefined>>;
  isEditSupplierModalOpen: boolean;
  setIsEditSupplierModalOpen: Dispatch<SetStateAction<boolean>>;
  isConfirmModalOpen: boolean;
  setIsConfirmModalOpen: Dispatch<SetStateAction<boolean>>;
  isAddSupplierModalOpen: boolean;
  setIsAddSupplierModalOpen: Dispatch<SetStateAction<boolean>>;
};

const SupplierListContext = createContext({} as SupplierListContextType);

type Props = {
  children: React.ReactNode;
  initialSupplier: Supplier[] | null;
};

export const SupplierListProvider = ({ children, initialSupplier }: Props) => {
  const [suppliers, setSuppliers] = useState<Supplier[]>(initialSupplier || []);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | undefined>();
  const [isEditSupplierModalOpen, setIsEditSupplierModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isAddSupplierModalOpen, setIsAddSupplierModalOpen] = useState(false);
  const [name, setName] = useState<string | undefined>();
  const [email, setEmail] = useState<string | undefined>();

  const fetchSupplier = async () => {
    const response = await getSuppliers({ name, email });
    setSuppliers([]);
    setSuppliers(response || []);
  };

  useEffect(() => {
    fetchSupplier();
  }, [name, email]);

  return (
    <SupplierListContext.Provider
      value={{
        suppliers,
        selectedSupplier,
        setName,
        setEmail,
        setSuppliers,
        setSelectedSupplier,
        isAddSupplierModalOpen,
        setIsAddSupplierModalOpen,
        isEditSupplierModalOpen,
        setIsEditSupplierModalOpen,
        isConfirmModalOpen,
        setIsConfirmModalOpen,
      }}>
      {children}
    </SupplierListContext.Provider>
  );
};

export const useSupplierListContext = () => useContext(SupplierListContext);
