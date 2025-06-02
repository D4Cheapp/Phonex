'use client';

import { Product } from '@/modules/product/types';
import { Input } from '@heroui/react';
import { FormProvider, useForm } from 'react-hook-form';
import { getImageSrc } from 'utils/get-image-href';

import { FormEvent } from 'react';

import { useProductContext } from './context';
import { ProductButtons } from './ProductButtons';
import { ProductCharacteristics } from './ProductCharacteristics';
import { ProductInfo } from './ProductInfo';

export const ProductForm = () => {
  const { product, isEditable, isCreating, onSubmit } = useProductContext();

  const form = useForm({
    defaultValues: {
      name: product?.name,
      description: product?.description,
      price: product?.price,
      image: product?.image,
      product_category_id: product?.product_category?.id ?? '',
      characteristics: product?.characteristics,
    },
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    form.handleSubmit(data => onSubmit(data as unknown as Product))();
  };

  return (
    <FormProvider {...form}>
      <form
        className="flex flex-col gap-20 max-w-[1024px] max-md:w-full mx-auto mt-10 items-center"
        onSubmit={handleSubmit}>
        <div className="flex gap-5 w-full max-md:max-w-full justify-between max-md:flex-col">
          {isCreating || isEditable ? (
            <div className="">
              <Input
                classNames={{
                  base: 'w-full mb-5',
                }}
                type="file"
                label="Изображение"
                labelPlacement="outside"
                variant="bordered"
                {...form.register('image')}
              />
              {product?.image && (
                <img
                  className="w-80 h-auto object-cover rounded-md border-medium"
                  src={getImageSrc(
                    product.image instanceof File
                      ? URL.createObjectURL(product.image)
                      : product.image
                  )}
                  alt={product?.name}
                />
              )}
            </div>
          ) : (
            <img
              className="w-full h-auto max-md:w-full max-md:h-auto object-cover rounded-md border-medium"
              src={
                product?.image
                  ? getImageSrc(
                      typeof product?.image === 'string'
                        ? product?.image
                        : URL.createObjectURL(product?.image)
                    )
                  : ''
              }
              alt={product?.name}
            />
          )}
          <ProductInfo />
        </div>
        <ProductCharacteristics />
        <ProductButtons />
      </form>
    </FormProvider>
  );
};
