import { ApiMethods, request } from 'utils/request';

import { Supplier } from '../suppliers/types';
import { Product } from './types';

type Props = {
  productId: string;
  shopId: string;
};

export const getSupplierProducts = async ({ productId, shopId }: Props) =>
  request<{ supplier: Supplier; products: Product[] }>({
    method: ApiMethods.GET,
    url: '/product/supplier-product',
    body: {
      product_id: productId,
      shop_id: shopId,
    },
  });
