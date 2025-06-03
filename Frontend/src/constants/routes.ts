export enum Routes {
  login = '/login',
  home = '/shop',
  sales = '/sales',
  productCreation = '/product',
  categories = '/categories',
  warehouse = '/warehouse',
  suppliers = '/suppliers',
  productSuppliers = '/product-supplier',
  supplies = '/supplies',
  users = '/users',
  shops = '/shops',
}

export const cashierRoutes = [{ label: 'Продажи', href: Routes.sales }];

export const managerRoutes = [
  { label: 'Добавление продукта', href: Routes.productCreation },
  { label: 'Управление категориями', href: Routes.categories },
  { label: 'Управление поставщиками', href: Routes.suppliers },
  { label: 'Управление складом', href: Routes.warehouse },
  { label: 'Управление поставками', href: Routes.supplies },
];

export const adminRoutes = [
  { label: 'Управление пользователями', href: Routes.users },
  { label: 'Управление магазинами', href: Routes.shops },
];

//Cashier
// sale management

//Manager
// category management
// product management
// warehouse management
// supplier management
// supplies management

//Admin
// manage users
// manage shops
