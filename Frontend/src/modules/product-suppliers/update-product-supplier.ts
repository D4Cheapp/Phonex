import { ApiMethods, request } from '@/utils/request';

import { CreateProductSupplierDto, ProductSupplier } from './types';

export const updateProductSupplier = (id: string, data: CreateProductSupplierDto) =>
  request<ProductSupplier>({
    method: ApiMethods.PUT,
    url: `/product-supplier/${id}`,
    body: data,
  });
