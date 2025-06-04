import { ApiMethods, request } from 'utils/request';

type Props = {
  userId: string;
  shopId: string;
  products: {
    productId: string;
    quantity: number;
  }[];
};

export const createSale = async ({ userId, shopId, products }: Props) =>
  request({
    method: ApiMethods.POST,
    url: `/sale`,
    body: {
      user_id: userId,
      shop_id: shopId,
      sale_items: products,
    },
  });
