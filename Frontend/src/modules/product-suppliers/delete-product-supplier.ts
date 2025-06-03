import { ApiMethods, request } from '@/utils/request';

type DeleteResponse = {
  success: boolean;
  message?: string;
};

export const deleteProductSupplier = (id: string) =>
  request<DeleteResponse>({
    method: ApiMethods.DELETE,
    url: `/product-supplier/${id}`,
  });
