import { ApiMethods, request } from 'utils/request';

import { Supplier } from './types';

export const getSupplier = async (id: string) =>
  request<Supplier>({
    method: ApiMethods.GET,
    url: `/supplier/${id}`,
  });
