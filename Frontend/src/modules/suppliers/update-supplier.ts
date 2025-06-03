import { ApiMethods, request } from 'utils/request';

import { Supplier } from './types';

export const updateSupplier = async ({ id, name, email, phone, description }: Supplier) =>
  request<Supplier>({
    method: ApiMethods.PATCH,
    url: `/supplier/${id}`,
    body: {
      name,
      email,
      phone,
      description,
    },
  });
