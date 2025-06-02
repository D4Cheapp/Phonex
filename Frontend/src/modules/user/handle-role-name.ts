import { Roles } from 'constants/roles';

export const handleRoleName = (role: string) => {
  switch (role) {
    case Roles.ADMIN:
      return 'Администратор';
    case Roles.MANAGER:
      return 'Менеджер';
    case Roles.CASHIER:
      return 'Кассир';
  }
};
