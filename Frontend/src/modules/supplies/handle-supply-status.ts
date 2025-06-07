export const handleSupplyStatus = (status: string) => {
  switch (status) {
    case 'PENDING':
      return 'В обработке';
    case 'COMPLETED':
      return 'Завершен';
    case 'CANCELLED':
      return 'Отменен';
  }
};
