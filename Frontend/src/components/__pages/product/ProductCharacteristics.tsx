'use client';

import { Button, Divider, Input } from '@heroui/react';

import { Fragment, useState } from 'react';

import { useProductContext } from './context';

export const ProductCharacteristics = () => {
  const [characteristicName, setCharacteristicName] = useState('');
  const [characteristicValue, setCharacteristicValue] = useState('');

  const { product, setProduct, isCreating, isEditable } = useProductContext();

  const handleAddCharacteristic = () => {
    setProduct(product =>
      product?.characteristics
        ? {
            ...product,
            characteristics: [
              ...(product.characteristics ?? []),
              { name: characteristicName, value: characteristicValue, id: Date.now() },
            ],
          }
        : {
            ...product,
            characteristics: [
              { name: characteristicName, value: characteristicValue, id: Date.now() },
            ],
          }
    );

    setCharacteristicName('');
    setCharacteristicValue('');
  };

  return (
    <div className="w-full flex flex-col gap-5 max-md:w-full">
      <h1 className="text-2xl font-bold mb-10">Характеристики</h1>
      <div className="w-full grid grid-cols-2 gap-5">
        <p className="font-semibold text-gray-500">Название</p>
        <p className="font-semibold text-gray-500">Значение</p>
      </div>
      <Divider />
      <div className="w-full grid grid-cols-2 gap-5 items-end">
        {product?.characteristics &&
          product?.characteristics.map(characteristic => (
            <Fragment key={characteristic.id}>
              <p>{characteristic.name}</p>
              <p>{characteristic.value}</p>
              <Divider className="w-full col-span-full" />
            </Fragment>
          ))}
        {isCreating && (
          <>
            <Input
              classNames={{
                base: 'w-full',
              }}
              label="Название"
              variant="bordered"
              size="lg"
              value={characteristicName}
              onChange={e => setCharacteristicName(e.target.value)}
            />
            <Input
              classNames={{
                base: 'w-full',
              }}
              label="Значение"
              variant="bordered"
              size="lg"
              value={characteristicValue}
              onChange={e => setCharacteristicValue(e.target.value)}
            />
            <Button
              className="col-span-full"
              color="primary"
              variant="ghost"
              size="lg"
              type="button"
              onPress={handleAddCharacteristic}>
              Добавить характеристику
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
