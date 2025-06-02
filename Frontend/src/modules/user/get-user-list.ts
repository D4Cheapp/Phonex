import { ApiMethods, request } from 'utils/request';

import { User } from './types';

type Props = {
  search?: string;
  email?: string;
  shopId?: number;
  roleId?: number;
};

export const getUserList = async ({ search, email, shopId, roleId }: Props) =>
  request<User[]>({
    method: ApiMethods.GET,
    url: '/user',
    body: {
      search,
      email,
      shopId,
      roleId,
    },
  });
