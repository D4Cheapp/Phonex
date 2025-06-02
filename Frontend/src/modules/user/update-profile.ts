import { ApiMethods, request } from 'utils/request';

import { User } from './types';

interface Props {
  id: number;
  name: string;
  email: string;
  roleId: number;
  shopId?: string;
  password?: string;
}

export const updateProfile = async ({ id, name, email, shopId, password, roleId }: Props) =>
  await request<User>({
    url: `/user/${id}`,
    method: ApiMethods.PATCH,
    body: {
      name,
      email,
      shop_id: shopId !== undefined ? Number(shopId) : undefined,
      role_id: roleId,
      password: password === '' || password === undefined ? undefined : password,
    },
  });
