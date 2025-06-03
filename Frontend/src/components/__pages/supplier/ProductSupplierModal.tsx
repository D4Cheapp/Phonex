'use client';

import { CreateProductSupplierDto, ProductSupplier } from '@/modules/product-suppliers/types';
import { Product } from '@/modules/product/types';
import { Shop } from '@/modules/shop/types';
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Switch,
} from '@heroui/react';
import { useForm } from 'react-hook-form';

import { useEffect } from 'react';

export type ProductSupplierModalProps = {
  shops: Shop[];
  shopProducts: Product[];
  isOpen: boolean;
  onClose: () => void;
  product: ProductSupplier | null;
  onSave: (data: CreateProductSupplierDto) => void;
  isLoading: boolean;
};

const ProductSupplierModal = ({
  isOpen,
  onClose,
  product,
  onSave,
  isLoading,
  shops,
  shopProducts,
}: ProductSupplierModalProps) => {
  const form = useForm({
    defaultValues: {
      price: product?.price?.toString() || '0',
      isPrimary: product?.is_primary || false,
      productId: product?.product.id || '',
      shopId: product?.shop.id || '',
    },
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    form.handleSubmit(data => onSave(data as unknown as CreateProductSupplierDto))();
  };

  const handleCloseClick = () => {
    onClose();
    form.reset();
  };

  useEffect(() => {
    if (!product) return;

    form.setValue('price', product?.price?.toString() || '0');
    form.setValue('isPrimary', product?.is_primary || false);
    form.setValue('productId', product?.product.id || '');
    form.setValue('shopId', product?.shop.id || '');
  }, [product]);

  return (
    <Modal isOpen={isOpen} onClose={handleCloseClick}>
      <ModalContent>
        <form onSubmit={handleFormSubmit}>
          <ModalHeader>{product ? 'Редактировать товар' : 'Добавить товар'}</ModalHeader>
          <ModalBody className="flex flex-col gap-4">
            <Select label="Магазин" variant="bordered" {...form.register('shopId')}>
              {shops.map(shop => (
                <SelectItem key={shop.id}>{shop.name}</SelectItem>
              ))}
            </Select>
            <Select label="Товар" variant="bordered" {...form.register('productId')}>
              {shopProducts.map(product => (
                <SelectItem key={product.id}>{product.name}</SelectItem>
              ))}
            </Select>
            <Input label="Цена" type="number" variant="bordered" {...form.register('price')} />
            <div className="flex items-center gap-2">
              <Switch {...form.register('isPrimary')} />
              <span>Основной поставщик</span>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Отмена
            </Button>
            <Button color="primary" type="submit" isLoading={isLoading}>
              Сохранить
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default ProductSupplierModal;
