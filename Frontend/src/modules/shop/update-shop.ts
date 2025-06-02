import { ApiMethods, request } from 'utils/request';

type Props = {
  id: string;
  name: string;
  address: string;
};

export const updateShop = async ({ id, name, address }: Props) =>
  request({
    method: ApiMethods.PATCH,
    url: `/shop/${id}`,
    body: {
      name,
      address,
    },
  });
