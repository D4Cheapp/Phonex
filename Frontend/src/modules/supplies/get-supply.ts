import { ApiMethods, request } from 'utils/request';

import { Supply } from './types';

export const getSupply = async (id: string) =>
  await request<Supply>({
    method: ApiMethods.GET,
    url: `/supply/${id}`,
  });
