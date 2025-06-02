'use client';

import { Divider } from '@heroui/react';

import { Fragment } from 'react';

import { useProductContext } from './context';

export const ProductCharacteristics = () => {
  const { product } = useProductContext();

  return (
    <div className="w-full flex flex-col gap-5 max-md:w-full">
      <h1 className="text-2xl font-bold mb-10">Характеристики</h1>
      <div className="w-full grid grid-cols-2 gap-5">
        <p className="font-semibold text-gray-500">Название</p>
        <p className="font-semibold text-gray-500">Значение</p>
      </div>
      <Divider />
      <div className="w-full grid grid-cols-2 gap-5 items-end">
        {product?.characteristics.map(characteristic => (
          <Fragment key={characteristic.id}>
            <p>{characteristic.name}</p>
            <p>{characteristic.value}</p>
            <Divider className="w-full col-span-full" />
          </Fragment>
        ))}
      </div>
    </div>
  );
};
