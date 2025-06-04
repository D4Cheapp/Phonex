import { useSales } from './SalesContext';

export const SalesHistory = () => {
  const { sales, selectedShopId } = useSales();

  if (!selectedShopId) {
    return (
      <p className="text-gray-500 text-center mt-16">
        Выберите магазин, чтобы просмотреть историю продаж
      </p>
    );
  }

  return (
    <div className="mt-16">
      <div className="grid [grid-template-columns:1fr_2fr_2fr_2fr] items-center max-md:[grid-template-columns:1fr_2fr] max-md:gap-6 p-4 pl-10 pr-10 max-md:pl-5 max-md:pr-5 gap-4 border-medium shadow-sm rounded-xl transition-all cursor-pointer mb-7">
        <div className="font-semibold">ID</div>
        <div className="font-semibold">Дата</div>
        <div className="font-semibold">Пользователь</div>
        <div className="font-semibold">Магазин</div>
      </div>
      {sales.map(sale => (
        <div
          key={sale.id}
          className="grid [grid-template-columns:1fr_2fr_2fr_2fr] items-center max-md:[grid-template-columns:1fr_2fr] max-md:gap-6 p-4 pl-10 pr-10 max-md:pl-5 max-md:pr-5 gap-4 border-medium shadow-sm rounded-xl hover:bg-gray-100 transition-all cursor-pointer mb-3">
          <div className="font-medium">{sale.id}</div>
          <div>{new Date(sale.createdAt).toLocaleString('ru-RU')}</div>
          <div>{sale.user.name || sale.user.email}</div>
          <div>{sale.shop.name}</div>
        </div>
      ))}
    </div>
  );
};
