import { Roles } from 'constants/roles';
import { Shop } from '../shop/types';

type Role = {
  id: number;
  name: Roles;
};

export type User = {
  id: number;
  name: string;
  email: string;
  shop: Shop;
  role: Role;
};
