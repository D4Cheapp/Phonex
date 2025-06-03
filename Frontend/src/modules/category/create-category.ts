import { ApiMethods, request } from 'utils/request';

import { Category } from './type';

export const createCategory = async (name: string) =>
  request<Category>({
    method: ApiMethods.POST,
    url: '/product-category',
    body: {
      name,
    },
  });
