import { ApiMethods, request } from 'utils/request';

import { Supply } from './types';

export const updateSupply = async (id: string) =>
  request<Supply>({
    method: ApiMethods.PUT,
    url: `/supply/${id}`,
  });
