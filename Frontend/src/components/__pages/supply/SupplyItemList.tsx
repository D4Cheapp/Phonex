'use client';

import { Product } from '@/modules/product/types';
import { Button, Input, Select, SelectItem } from '@heroui/react';

import { Dispatch, SetStateAction, useState } from 'react';

type Props = {
  isCreating?: boolean;
  products: Product[];
  selectedProducts: (Product & { quantity: number })[];
  setSelectedProducts: Dispatch<SetStateAction<(Product & { quantity: number })[]>>;
};

export const SupplyItemList = ({
  isCreating,
  products,
  selectedProducts,
  setSelectedProducts,
}: Props) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>();
  const [quantity, setQuantity] = useState('');

  const handleAddProduct = () => {
    if (!selectedProduct) return;

    setSelectedProducts(prev => [...prev, { ...selectedProduct, quantity: Number(quantity) }]);
    setSelectedProduct(undefined);
    setQuantity('');
  };

  return (
    <>
      <h2 className="text-xl font-semibold col-span-2">Список товаров</h2>
      <div className="w-full col-span-2 grid grid-cols-3">
        <p>Название</p>
        <p>Количество</p>
        <p>Цена</p>
      </div>
      <div className="col-span-2 flex flex-col gap-5">
        {selectedProducts.map(product => (
          <div className="w-full grid grid-cols-3 p-4 rounded-xl border-medium" key={product.id}>
            <p>{product.name}</p>
            <p>{product.quantity}</p>
            <p>{product.quantity ? product.quantity * product.price : 0}</p>
          </div>
        ))}
      </div>
      {isCreating && (
        <div className="w-full col-span-2 grid grid-cols-2 gap-5">
          <h2 className="text-xl font-semibold col-span-2 mt-5 mb-2">Добавление товара</h2>
          <Select label="Название" variant="bordered">
            {products.map(product => (
              <SelectItem key={product.id} onClick={() => setSelectedProduct(product)}>
                {product.name}
              </SelectItem>
            ))}
          </Select>
          <Input
            label="Количество"
            variant="bordered"
            value={quantity}
            onChange={e => setQuantity(e.target.value)}
          />
          <Button
            className="col-span-2"
            type="button"
            color="primary"
            variant="bordered"
            onPress={handleAddProduct}>
            Добавить товар
          </Button>
        </div>
      )}
    </>
  );
};
