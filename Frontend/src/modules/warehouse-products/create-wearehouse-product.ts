import { ApiMethods, request } from '@/utils/request';

export const createWarehouseProduct = async (data: { productId: string; shopId: string }) =>
  request({
    method: ApiMethods.POST,
    url: `/warehouse-product`,
    body: data,
  });
