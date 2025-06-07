import { useFormContext } from 'react-hook-form';

export const SupplyItemList = () => {
  const form = useFormContext();

  return (
    <div>
      <h2 className="text-xl font-semibold">Список товаров</h2>
    </div>
  );
};
