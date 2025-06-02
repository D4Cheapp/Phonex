import { ApiMethods, request } from 'utils/request';

import { Shop } from './types';

type Props = {
  name?: string;
  address?: string;
};

export const getShopList = async ({ name, address }: Props) =>
  request<Shop[]>({
    method: ApiMethods.GET,
    url: '/shop',
    body: {
      name,
      address,
    },
  });
