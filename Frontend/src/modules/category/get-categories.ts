import { ApiMethods, request } from 'utils/request';

import { Category } from './type';

export const getCategories = async (search?: string) =>
  request<Category[]>({
    method: ApiMethods.GET,
    url: '/product-category',
    body: {
      ...(search ? { search } : {}),
    },
  });
