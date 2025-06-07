import { ApiMethods, request } from 'utils/request';

import { Supply } from './types';

type Props = {
  shopId?: string;
  supplierId?: string;
  supplyStatusId?: string;
};

export const getSupplies = async ({ shopId, supplierId, supplyStatusId }: Props) =>
  await request<Supply[]>({
    method: ApiMethods.GET,
    url: `/supply`,
    body: {
      shop_id: shopId,
      supplier_id: supplierId,
      supply_status_id: supplyStatusId,
    },
  });
