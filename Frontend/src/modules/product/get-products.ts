import { ApiMethods, request } from 'utils/request';

import { Product } from './types';

type Props = {
  search?: string;
  category?: number;
};

export const getProducts = async ({ search, category }: Props) =>
  request<Product[]>({
    method: ApiMethods.GET,
    url: '/product',
    body: {
      search,
      category,
    },
  });
