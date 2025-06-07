import { ApiMethods, request } from 'utils/request';

import { Supply } from './types';

type Props = {
  id: string;
  supplyStatusId: string;
};

export const updateSupply = async ({ id, supplyStatusId }: Props) =>
  request<Supply>({
    method: ApiMethods.PATCH,
    url: `/supply`,
    body: {
      supply_id: id,
      supply_status_id: supplyStatusId,
    },
  });
