import { ApiMethods, request } from 'utils/request';

import { User } from './types';

type Props = {
  name: string;
  email: string;
  shopId?: number;
  password: string;
  roleId: number;
};

export const createUser = async ({ name, email, shopId, password, roleId }: Props) =>
  await request<User>({
    url: '/user/register',
    method: ApiMethods.POST,
    body: {
      name,
      email,
      password,
      shop_id: shopId !== undefined ? Number(shopId) : undefined,
      role_id: Number(roleId),
    },
  });
