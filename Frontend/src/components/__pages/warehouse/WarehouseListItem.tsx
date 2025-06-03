'use client';

import { WarehouseProduct } from '@/modules/warehouse-products/types';
import { Button } from '@heroui/react';

import DeleteIcon from 'icons/delete.svg';

import { useWarehouseListContext } from './context';

type Props = {
  warehouseProduct: WarehouseProduct;
};

export const WarehouseListItem = ({ warehouseProduct }: Props) => {
  const { setSelectedWarehouseProduct, setIsEditWarehouseProductModalOpen, setIsConfirmModalOpen } =
    useWarehouseListContext();

  const handleSelectWarehouseProduct = () => {
    setSelectedWarehouseProduct(warehouseProduct);
    setIsEditWarehouseProductModalOpen(true);
  };

  const handleDeleteWarehouseProduct = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedWarehouseProduct(warehouseProduct);
    setIsConfirmModalOpen(true);
  };

  return (
    <div
      onClick={handleSelectWarehouseProduct}
      className="grid [grid-template-columns:1fr_1fr_1fr_1.5rem] items-center max-md:[grid-template-columns:1fr_1fr_1fr] max-md:gap-6 p-4 pl-10 pr-10 max-md:pl-5 max-md:pr-5 gap-4 border-medium shadow-sm rounded-xl hover:bg-gray-100 transition-all cursor-pointer">
      <div>
        <p className="text-gray-500 hidden max-md:block">Магазин</p>
        <p>{warehouseProduct.shop.name}</p>
      </div>
      <div>
        <p className="text-gray-500 hidden max-md:block">Товар</p>
        <p>{warehouseProduct.product.name}</p>
      </div>
      <div>
        <p className="text-gray-500 hidden max-md:block">Количество</p>
        <p>{warehouseProduct.quantity}</p>
      </div>
      <span className="cursor-pointer max-md:hidden" onClick={handleDeleteWarehouseProduct}>
        <DeleteIcon className="w-6 h-6" />
      </span>
      <Button
        className="col-span-full mt-5 hidden max-md:block"
        color="danger"
        variant="bordered"
        onClick={handleDeleteWarehouseProduct}>
        Удалить
      </Button>
    </div>
  );
};
