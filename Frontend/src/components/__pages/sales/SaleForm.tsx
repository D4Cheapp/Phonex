import { Button, Input, Select, SelectItem } from '@heroui/react';
import { useFieldArray, useForm } from 'react-hook-form';

import DeleteIcon from 'icons/delete.svg';

import { useSales } from './SalesContext';

type ProductForm = {
  productId: string;
  quantity: number;
};

type FormData = {
  shopId: string;
  products: ProductForm[];
};

export const SaleForm = () => {
  const { shops, products, createSaleHandler, setSelectedShopId } = useSales();

  const { register, handleSubmit, control, reset } = useForm<FormData>({
    defaultValues: {
      shopId: '',
      products: [{ productId: '', quantity: 1 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'products',
  });

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleSubmit(async (data: FormData) => {
      console.log(data);

      if (!data.shopId || !data.products.length) return;

      try {
        await createSaleHandler(data.shopId, data.products);
        reset({
          shopId: data.shopId,
          products: [{ productId: '', quantity: 1 }],
        });
      } catch (error) {
        console.error('Error creating sale:', error);
      }
    })();
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-semibold">Новая продажа</h2>
      <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
        <div className="grid gap-4">
          <Select
            label="Магазин"
            variant="bordered"
            {...register('shopId')}
            onChange={e => setSelectedShopId(e.target.value)}>
            {shops?.map(shop => <SelectItem key={shop.id}>{shop.name}</SelectItem>)}
          </Select>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-xl">Товары</h3>
              <Button
                variant="bordered"
                color="primary"
                onPress={() => append({ productId: '', quantity: 1 })}>
                Добавить товар
              </Button>
            </div>
            {fields.map((field, index) => (
              <div key={field.id} className="flex gap-4 items-center">
                <Select
                  id={`product-${index}`}
                  label="Товар"
                  variant="bordered"
                  {...register(`products.${index}.productId`)}>
                  {products?.map(product => (
                    <SelectItem key={product.id}>{product.name}</SelectItem>
                  ))}
                </Select>
                <Input
                  id={`quantity-${index}`}
                  label="Количество"
                  type="number"
                  variant="bordered"
                  min="1"
                  {...register(`products.${index}.quantity`)}
                />
                {fields.length > 1 && (
                  <span onClick={() => remove(index)}>
                    <DeleteIcon className="w-6 h-6 cursor-pointer" />
                  </span>
                )}
              </div>
            ))}
          </div>
          <Button type="submit" color="primary">
            Оформить продажу
          </Button>
        </div>
      </form>
    </div>
  );
};
