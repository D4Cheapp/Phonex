import { ApiMethods, request } from 'utils/request';

import { WarehouseProduct } from './types';

type Props = {
  shopId?: string;
  productId?: string;
};

export const getWarehouseProducts = async ({ shopId, productId }: Props) =>
  request<WarehouseProduct[]>({
    method: ApiMethods.GET,
    url: '/warehouse-product',
    body: {
      shop_id: shopId,
      product_id: productId,
    },
  });
