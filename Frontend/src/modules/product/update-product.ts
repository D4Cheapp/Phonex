import { ApiMethods, request } from 'utils/request';

import { Product } from './types';
import { generateProductProps } from './utils/generate-product-props';

export const updateProduct = async (id: string, product: Product) =>
  request({
    method: ApiMethods.PATCH,
    url: `/product/${id}`,
    isForm: true,
    body: generateProductProps(product, true),
  });
