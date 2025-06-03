'use client';

import { deleteWarehouseProduct } from '@/modules/warehouse-products/delete-wearehouse-product';
import { ConfirmModal } from 'components/Modals/ConfirmModal';
import { WarehouseModal } from 'components/Modals/WarehouseModal';

import { useWarehouseListContext } from './context';
import { WarehouseListItem } from './WarehouseListItem';

export const WarehouseList = () => {
  const {
    warehouseProducts,
    isEditWarehouseProductModalOpen,
    isConfirmModalOpen,
    setIsConfirmModalOpen,
    selectedWarehouseProduct,
    setSelectedWarehouseProduct,
    setWarehouseProducts,
    setIsEditWarehouseProductModalOpen,
    shops,
    products,
  } = useWarehouseListContext();

  const handleConfirmModalClose = () => {
    setIsConfirmModalOpen(false);
  };

  const handleConfirmModalConfirm = async () => {
    if (!selectedWarehouseProduct) return;
    await deleteWarehouseProduct(selectedWarehouseProduct.id);
    setWarehouseProducts(prev =>
      prev?.filter(warehouseProduct => warehouseProduct.id !== selectedWarehouseProduct.id)
    );
    setIsConfirmModalOpen(false);
    setSelectedWarehouseProduct(undefined);
  };

  return (
    <div className="flex flex-col gap-4 mt-10">
      <div className="grid [grid-template-columns:1fr_1fr_1fr_1.5rem] max-md:hidden pl-10 pr-10 max-md:pl-5 max-md:pr-5 gap-4">
        <p className="text-gray-500">Магазин</p>
        <p className="text-gray-500">Товар</p>
        <p className="text-gray-500">Количество</p>
      </div>
      {warehouseProducts?.map(warehouseProduct => (
        <WarehouseListItem key={warehouseProduct.id} warehouseProduct={warehouseProduct} />
      ))}
      {isConfirmModalOpen && (
        <ConfirmModal
          title="Удаление товара на складе"
          description="Вы уверены, что хотите удалить этот товар на складе?"
          isOpen={isConfirmModalOpen}
          onClose={handleConfirmModalClose}
          onConfirm={handleConfirmModalConfirm}
        />
      )}
      {selectedWarehouseProduct && (
        <WarehouseModal
          isOpen={isEditWarehouseProductModalOpen}
          onClose={() => setIsEditWarehouseProductModalOpen(false)}
          warehouseProduct={selectedWarehouseProduct}
          shops={shops}
          products={products}
        />
      )}
    </div>
  );
};
