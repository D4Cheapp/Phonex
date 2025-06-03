import { ApiMethods, request } from 'utils/request';

export const deleteCategory = async (id: number) =>
  request({
    method: ApiMethods.DELETE,
    url: `/product-category/${id}`,
  });
