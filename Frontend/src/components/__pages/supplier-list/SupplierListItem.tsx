'use client';

import { Supplier } from '@/modules/suppliers/types';
import { Button } from '@heroui/react';

import DeleteIcon from 'icons/delete.svg';

import { useSupplierListContext } from './context';

type Props = {
  supplier: Supplier;
};

export const SupplierListItem = ({ supplier }: Props) => {
  const { setSelectedSupplier, setIsEditSupplierModalOpen, setIsConfirmModalOpen } =
    useSupplierListContext();

  const handleSelectSupplier = () => {
    setSelectedSupplier(supplier);
    setIsEditSupplierModalOpen(true);
  };

  const handleDeleteSupplier = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedSupplier(supplier);
    setIsConfirmModalOpen(true);
  };

  return (
    <div
      onClick={handleSelectSupplier}
      className="grid [grid-template-columns:1fr_1fr_1fr_1.5rem] items-center max-md:[grid-template-columns:1fr_1fr_1fr] max-md:gap-6 p-4 pl-10 pr-10 max-md:pl-5 max-md:pr-5 gap-4 border-medium shadow-sm rounded-xl hover:bg-gray-100 transition-all cursor-pointer">
      <div>
        <p className="text-gray-500 hidden max-md:block">Имя</p>
        <p>{supplier.name}</p>
      </div>
      <div>
        <p className="text-gray-500 hidden max-md:block">Почта</p>
        <p>{supplier.email}</p>
      </div>
      <div>
        <p className="text-gray-500 hidden max-md:block">Телефон</p>
        <p>{supplier.phone}</p>
      </div>
      <span className="cursor-pointer max-md:hidden" onClick={handleDeleteSupplier}>
        <DeleteIcon className="w-6 h-6" />
      </span>
      <Button
        className="col-span-full mt-5 hidden max-md:block"
        color="danger"
        variant="bordered"
        onClick={handleDeleteSupplier}>
        Удалить
      </Button>
    </div>
  );
};
