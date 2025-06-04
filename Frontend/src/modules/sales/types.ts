import { Shop } from '../shop/types';
import { User } from '../user/types';

export type Sale = {
  id: string;
  shop: Shop;
  user: User;
  createdAt: Date;
};
