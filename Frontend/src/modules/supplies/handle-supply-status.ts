export const handleSupplyStatus = (status: string) => {
  switch (status) {
    case 'PENDING':
      return 'В обработке';
    case 'ACCEPTED':
      return 'Завершен';
    case 'REJECTED':
      return 'Отменен';
  }
};
