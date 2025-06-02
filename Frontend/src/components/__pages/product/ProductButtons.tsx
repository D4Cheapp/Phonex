'use client';

import { Button } from '@heroui/react';
import { useAuthContext } from 'components/Auth/context';
import { ConfirmModal } from 'components/Modals/ConfirmModal';
import { Roles } from 'constants/roles';
import { Routes } from 'constants/routes';

import { useState } from 'react';

import Link from 'next/link';

import { useProductContext } from './context';

export const ProductButtons = () => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const { isEditable, isCreating, product, onDelete } = useProductContext();

  const { user } = useAuthContext();

  return (
    user?.id &&
    (user.role.name === Roles.ADMIN || user.role.name === Roles.MANAGER) && (
      <div className="w-full flex gap-5 justify-end">
        {(isEditable || isCreating) && (
          <Button className="w-[150px]" color="primary" type="submit">
            Сохранить
          </Button>
        )}
        {!isEditable && !isCreating && (
          <Link href={`${Routes.productCreation}/${product?.id}/edit`}>
            <Button className="w-[150px]" color="primary" type="button">
              Изменить
            </Button>
          </Link>
        )}
        <Button
          className="w-[150px]"
          color="danger"
          type="button"
          onPress={() => setIsConfirmOpen(true)}>
          Удалить
        </Button>
        <ConfirmModal
          title="Удаление продукта"
          description="Вы уверены, что хотите удалить этот продукт?"
          isOpen={isConfirmOpen}
          onClose={() => setIsConfirmOpen(false)}
          onConfirm={onDelete}
        />
      </div>
    )
  );
};
