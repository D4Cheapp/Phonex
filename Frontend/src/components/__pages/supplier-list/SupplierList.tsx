'use client';

import { deleteSupplier } from '@/modules/suppliers/delete-supplier';
import { ConfirmModal } from 'components/Modals/ConfirmModal';
import { SupplierModal } from 'components/Modals/SupplierModal';

import { useSupplierListContext } from './context';
import { SupplierListItem } from './SupplierListItem';

export const SupplierList = () => {
  const {
    suppliers,
    isEditSupplierModalOpen,
    isConfirmModalOpen,
    setIsConfirmModalOpen,
    selectedSupplier,
    setSelectedSupplier,
    setSuppliers,
    setIsEditSupplierModalOpen,
  } = useSupplierListContext();

  const handleConfirmModalClose = () => {
    setIsConfirmModalOpen(false);
  };

  const handleConfirmModalConfirm = async () => {
    if (!selectedSupplier) return;
    await deleteSupplier(selectedSupplier.id.toString());
    setSuppliers(prev => prev?.filter(supplier => supplier.id !== selectedSupplier.id));
    setIsConfirmModalOpen(false);
    setSelectedSupplier(undefined);
  };

  return (
    <div className="flex flex-col gap-4 mt-10">
      <div className="grid [grid-template-columns:1fr_1fr_1fr_1.5rem] max-md:hidden pl-10 pr-10 max-md:pl-5 max-md:pr-5 gap-4">
        <p className="text-gray-500">Название</p>
        <p className="text-gray-500">Почта</p>
        <p className="text-gray-500">Телефон</p>
      </div>
      {suppliers?.map(supplier => <SupplierListItem key={supplier.id} supplier={supplier} />)}
      <ConfirmModal
        title="Удаление поставщика"
        description="Вы уверены, что хотите удалить этого поставщика?"
        isOpen={isConfirmModalOpen}
        onClose={handleConfirmModalClose}
        onConfirm={handleConfirmModalConfirm}
      />
      {selectedSupplier && (
        <SupplierModal
          isOpen={isEditSupplierModalOpen}
          onClose={() => setIsEditSupplierModalOpen(false)}
          supplier={selectedSupplier}
        />
      )}
    </div>
  );
};
