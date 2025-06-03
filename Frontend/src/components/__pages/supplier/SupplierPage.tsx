'use client';

import { createProductSupplier } from '@/modules/product-suppliers/create-product-supplier';
import { deleteProductSupplier } from '@/modules/product-suppliers/delete-product-supplier';
import type { CreateProductSupplierDto, ProductSupplier } from '@/modules/product-suppliers/types';
import { updateProductSupplier } from '@/modules/product-suppliers/update-product-supplier';
import { Product } from '@/modules/product/types';
import { Shop } from '@/modules/shop/types';
import { createSupplier } from '@/modules/suppliers/create-supplier';
import type { Supplier } from '@/modules/suppliers/types';
import { updateSupplier } from '@/modules/suppliers/update-supplier';
import { Button, Input, Textarea, useDisclosure } from '@heroui/react';
import { useForm } from 'react-hook-form';

import { FormEvent, useState } from 'react';

import ProductSupplierModal from './ProductSupplierModal';
import { SupplierProductsList } from './SupplierProductsList';

type Props = {
  shops: Shop[];
  shopProducts: Product[];
  supplier?: Supplier;
  initialProducts?: ProductSupplier[];
};

export const SupplierPage = ({ supplier, initialProducts = [], shops, shopProducts }: Props) => {
  const [products, setProducts] = useState<ProductSupplier[]>(initialProducts || []);
  const [selectedProduct, setSelectedProduct] = useState<ProductSupplier | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { isOpen, onOpen, onClose: onCloseModal } = useDisclosure();

  const form = useForm({
    defaultValues: {
      name: supplier?.name || '',
      email: supplier?.email || '',
      phone: supplier?.phone || '',
      description: supplier?.description || '',
    },
  });

  const handleAddProduct = () => {
    setSelectedProduct(null);
    onOpen();
  };

  const handleEditProduct = (product: ProductSupplier) => {
    setSelectedProduct(product);
    onOpen();
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    onCloseModal();
  };

  const handleSaveProduct = async (formData: CreateProductSupplierDto) => {
    if (!supplier?.id) return;

    const isEditing = !!selectedProduct?.id;

    if (isEditing) {
      await updateProductSupplier(selectedProduct.id, formData);
      onCloseModal();
      return;
    }

    await createProductSupplier({
      isPrimary: formData.isPrimary,
      price: formData.price,
      productId: formData.productId,
      shopId: formData.shopId,
      supplierId: supplier.id.toString(),
    });
    onCloseModal();
  };

  const handleDeleteProduct = async (id: string): Promise<void> => {
    if (!deleteProductSupplier) return;

    try {
      await deleteProductSupplier(id);
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      console.error('Error deleting product:', err);
      setError('Не удалось удалить товар');
      throw err;
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    form.handleSubmit(async data => {
      if (!supplier) {
        const isRequiredFieldsEmpty = !data.name || !data.email || !data.phone || !data.description;
        if (isRequiredFieldsEmpty) return;
        await createSupplier({
          name: data.name?.toString() || '',
          email: data.email?.toString() || '',
          phone: data.phone?.toString() || '',
          description: data.description?.toString() || '',
        });
        return;
      }
      await updateSupplier({
        id: supplier.id,
        name: data.name?.toString() || '',
        email: data.email?.toString() || '',
        phone: data.phone?.toString() || '',
        description: data.description?.toString() || '',
      });
    })();
  };

  return (
    <div className="max-w-[1024px] mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-8">Поставщик</h1>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-5">
          <Input label="Имя" required variant="bordered" {...form.register('name')} />
          <Input label="Почта" required variant="bordered" {...form.register('email')} />
        </div>
        <Input label="Телефон" required variant="bordered" {...form.register('phone')} />
        <Textarea label="Описание" required variant="bordered" {...form.register('description')} />
        <div className="flex justify-end gap-5 mt-5 mb-5">
          <Button className="w-1/3" color="primary" type="submit">
            Сохранить
          </Button>
        </div>
      </form>
      <SupplierProductsList
        products={products}
        onAddProduct={handleAddProduct}
        onEditProduct={handleEditProduct}
        onDeleteProduct={handleDeleteProduct}
      />
      {isOpen && (
        <ProductSupplierModal
          isOpen={isOpen}
          onClose={handleCloseModal}
          product={selectedProduct}
          onSave={handleSaveProduct}
          shops={shops}
          shopProducts={shopProducts}
          isLoading={isLoading}
        />
      )}
      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
          {error}
          <button className="float-right font-bold" onClick={() => setError(null)}>
            ×
          </button>
        </div>
      )}
    </div>
  );
};
