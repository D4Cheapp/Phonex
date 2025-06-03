import { ApiMethods, request } from '@/utils/request';

import { CreateProductSupplierDto, ProductSupplier } from './types';

export const createProductSupplier = (data: CreateProductSupplierDto) =>
  request<ProductSupplier>({
    method: ApiMethods.POST,
    url: '/product-supplier',
    body: data,
  });
