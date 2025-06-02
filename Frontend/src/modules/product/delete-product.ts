import { ApiMethods, request } from 'utils/request';

export const deleteProduct = async (id: string) =>
  await request({
    method: ApiMethods.DELETE,
    url: `/product/${id}`,
  });
