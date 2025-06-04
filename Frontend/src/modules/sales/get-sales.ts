import { ApiMethods, request } from 'utils/request';

import { Sale } from './types';

type Props = {
  shopId?: string;
};

export const getSales = async ({ shopId }: Props) =>
  request<Sale[]>({
    method: ApiMethods.GET,
    url: `/sale/${shopId}`,
  });
