import { ApiMethods, request } from 'utils/request';

import { Product } from './types';
import { generateProductProps } from './utils/generate-product-props';

export const createProduct = async (product: Product) =>
  request<Product>({
    method: ApiMethods.POST,
    url: '/product',
    isForm: true,
    body: generateProductProps(product),
  });
