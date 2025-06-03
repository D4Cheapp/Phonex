import { ApiMethods, request } from 'utils/request';

export const deleteSupplier = async (id: string) =>
  request({
    method: ApiMethods.DELETE,
    url: `/supplier/${id}`,
  });
