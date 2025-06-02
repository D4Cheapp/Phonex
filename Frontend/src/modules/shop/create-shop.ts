import { ApiMethods, request } from 'utils/request';

type Props = {
  name: string;
  address: string;
};

export const createShop = async ({ name, address }: Props) =>
  request({
    method: ApiMethods.POST,
    url: '/shop',
    body: {
      name,
      address,
    },
  });
