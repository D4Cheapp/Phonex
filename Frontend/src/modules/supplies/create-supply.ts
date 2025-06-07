import { ApiMethods, request } from 'utils/request';

import { Supply, SupplyItem } from './types';

type Props = {
  shopId: string;
  supplierId: string;
  supplyStatusId: string;
  supplyItems: SupplyItem[];
};

export const createSupply = async ({ shopId, supplierId, supplyStatusId, supplyItems }: Props) =>
  request<Supply>({
    method: ApiMethods.PATCH,
    url: '/supply',
    body: {
      shop_id: shopId,
      supplier_id: supplierId,
      supply_status_id: supplyStatusId,
      supply_items: supplyItems,
    },
  });
