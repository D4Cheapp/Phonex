import { ApiMethods, request } from '@/utils/request';

export const deleteWarehouseProduct = async (id: string) =>
  request({
    method: ApiMethods.DELETE,
    url: `/warehouse-product/${id}`,
  });
