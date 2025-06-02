import { ApiMethods, request } from 'utils/request';

import { Product } from './types';

export const getProductById = async (id: string) =>
  request<Product>({
    method: ApiMethods.GET,
    url: `/product/${id}`,
  });
