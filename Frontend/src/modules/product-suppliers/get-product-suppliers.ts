import { ApiMethods, request } from '@/utils/request';

import { ProductSupplier } from './types';

export const getProductSuppliers = async (id: string) =>
  await request<ProductSupplier[]>({
    method: ApiMethods.GET,
    url: '/product-supplier',
    body: {
      supplier_id: id,
    },
  });
