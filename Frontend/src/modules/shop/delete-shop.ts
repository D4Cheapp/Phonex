import { ApiMethods, request } from 'utils/request';

export const deleteShop = async (id: string) =>
  request({
    method: ApiMethods.DELETE,
    url: `/shop/${id}`,
  });
