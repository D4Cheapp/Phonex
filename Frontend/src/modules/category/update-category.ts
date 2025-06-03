import { ApiMethods, request } from 'utils/request';

import { Category } from './type';

export const updateCategory = async (id: number, name: string) =>
  request<Category>({
    method: ApiMethods.PATCH,
    url: `/product-category/${id}`,
    body: { name },
  });
