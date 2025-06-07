'use client';

import { Select, SelectItem } from '@heroui/react';

import { useEffect, useState } from 'react';

import { useSupplyListContext } from './context';

export const SuppliesFilter = () => {
  const [shopId, setShopId] = useState<string>();
  const [supplierId, setSupplierId] = useState<string>();
  const [supplyStatusId, setSupplyStatusId] = useState<string>();

  const {
    shops,
    suppliers,
    setShopId: setShopIdContext,
    setSupplierId: setSupplierIdContext,
    setSupplyStatusId: setSupplyStatusIdContext,
  } = useSupplyListContext();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShopIdContext(shopId);
      setSupplierIdContext(supplierId);
      setSupplyStatusIdContext(supplyStatusId);
    }, 1000);
    return () => clearTimeout(timer);
  }, [shopId, supplierId, supplyStatusId]);

  return (
    <div className="grid grid-cols-2 gap-5">
      <Select
        label="Магазин"
        variant="bordered"
        value={shopId}
        onChange={e => setShopId(e.target.value)}>
        {shops.map(shop => (
          <SelectItem key={shop.id}>{shop.name}</SelectItem>
        ))}
      </Select>
      <Select
        label="Поставщик"
        variant="bordered"
        value={supplierId}
        onChange={e => setSupplierId(e.target.value)}>
        {suppliers?.map(supplier => <SelectItem key={supplier.id}>{supplier.name}</SelectItem>)}
      </Select>
      <Select
        label="Статус"
        variant="bordered"
        className="col-span-2"
        value={supplyStatusId}
        onChange={e => setSupplyStatusId(e.target.value)}>
        <SelectItem key="1">В обработке</SelectItem>
        <SelectItem key="2">Завершен</SelectItem>
        <SelectItem key="3">Отменен</SelectItem>
      </Select>
    </div>
  );
};
