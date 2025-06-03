'use client';

import { ProductSupplier } from '@/modules/product-suppliers/types';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@heroui/react';

import DeleteIcon from 'icons/delete.svg';

interface Props {
  products: ProductSupplier[];
  onAddProduct?: () => void;
  onEditProduct?: (product: ProductSupplier) => void;
  onDeleteProduct?: (id: string) => Promise<void>;
}

export const SupplierProductsList = ({
  products,
  onAddProduct,
  onEditProduct,
  onDeleteProduct,
}: Props) => {
  const handleDeleteClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    onDeleteProduct?.(id);
  };

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Товары поставщика</h2>
        {onAddProduct && (
          <Button color="primary" onPress={onAddProduct}>
            Добавить товар
          </Button>
        )}
      </div>

      <Table aria-label="Supplier products list">
        <TableHeader>
          <TableColumn>Магазин</TableColumn>
          <TableColumn>Товар</TableColumn>
          <TableColumn>Цена</TableColumn>
          <TableColumn>Основной поставщик</TableColumn>
          <TableColumn>&nbsp;</TableColumn>
        </TableHeader>
        <TableBody>
          {products.map(product => (
            <TableRow
              key={product.id}
              onClick={() => onEditProduct?.(product)}
              className="cursor-pointer">
              <TableCell>{product.shop.name}</TableCell>
              <TableCell>{product.product.name}</TableCell>
              <TableCell>{product.price} ₽</TableCell>
              <TableCell>{product.is_primary ? 'Да' : 'Нет'}</TableCell>
              <TableCell>
                <span
                  className="cursor-pointer max-md:hidden"
                  onClick={e => handleDeleteClick(e, product.id)}>
                  <DeleteIcon className="w-6 h-6" />
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
