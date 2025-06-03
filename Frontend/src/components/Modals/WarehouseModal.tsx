import { Product } from '@/modules/product/types';
import { Shop } from '@/modules/shop/types';
import { createWarehouseProduct } from '@/modules/warehouse-products/create-wearehouse-product';
import { WarehouseProduct } from '@/modules/warehouse-products/types';
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Select,
  SelectItem,
} from '@heroui/react';
import { useForm } from 'react-hook-form';

import { FormEvent } from 'react';

type Props = {
  shops: Shop[];
  products: Product[];
  warehouseProduct?: WarehouseProduct;
  isOpen: boolean;
  onClose: () => void;
};

export const WarehouseModal = ({ isOpen, onClose, warehouseProduct, products, shops }: Props) => {
  const form = useForm({
    defaultValues: {
      productId: warehouseProduct?.product?.id || '',
      shopId: warehouseProduct?.shop?.id || '',
    },
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    form.handleSubmit(async data => {
      if (!warehouseProduct?.id) {
        const isRequiredFieldsEmpty = !data.productId || !data.shopId;
        if (isRequiredFieldsEmpty) return;

        await createWarehouseProduct({
          productId: data.productId?.toString() || '',
          shopId: data.shopId?.toString() || '',
        });
        onClose();
        return;
      }
    })();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>Позиция товара на складе</ModalHeader>
        <ModalBody>
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <Select label="Товар" variant="bordered" {...form.register('productId')}>
              {products.map(product => (
                <SelectItem key={product.id}>{product.name}</SelectItem>
              ))}
            </Select>
            <Select label="Магазин" variant="bordered" {...form.register('shopId')}>
              {shops.map(shop => (
                <SelectItem key={shop.id}>{shop.name}</SelectItem>
              ))}
            </Select>
            <div className="flex justify-around gap-5 mt-5 mb-5">
              {!warehouseProduct?.id && (
                <Button className="w-1/3" color="primary" type="submit">
                  Сохранить
                </Button>
              )}
              <Button className="w-1/3" color="danger" onPress={onClose}>
                Закрыть
              </Button>
            </div>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
