'use client';

import { Product } from '@/modules/product/types';
import { Shop } from '@/modules/shop/types';
import { Select, SelectItem } from '@heroui/react';

import { useEffect, useState } from 'react';

import { useWarehouseListContext } from './context';

type Props = {
  shops: Shop[] | null;
  products: Product[] | null;
};

export const WarehouseFilter = ({ shops, products }: Props) => {
  const [shopId, setShopId] = useState<string>();
  const [productId, setProductId] = useState<string>();

  const { setShopId: setShopIdContext, setProductId: setProductIdContext } =
    useWarehouseListContext();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShopIdContext(shopId ? shopId : undefined);
      setProductIdContext(productId ? productId : undefined);
    }, 1000);
    return () => clearTimeout(timer);
  }, [shopId, productId]);

  return (
    <div className="grid grid-cols-2 gap-5">
      {shops && (
        <Select
          label="Магазин"
          variant="bordered"
          value={shopId?.toString() || ''}
          onChange={e => setShopId(e.target.value)}>
          {shops?.map(shop => <SelectItem key={shop.id}>{shop.name}</SelectItem>)}
        </Select>
      )}
      {products && (
        <Select
          label="Товар"
          variant="bordered"
          value={productId?.toString() || ''}
          onChange={e => setProductId(e.target.value)}>
          {products?.map(product => <SelectItem key={product.id}>{product.name}</SelectItem>)}
        </Select>
      )}
    </div>
  );
};
