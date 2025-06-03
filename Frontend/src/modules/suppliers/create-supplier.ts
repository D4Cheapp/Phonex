import { ApiMethods, request } from 'utils/request';

import { Supplier } from './types';

export const createSupplier = async ({ name, email, phone, description }: Omit<Supplier, 'id'>) =>
  request<Supplier>({
    method: ApiMethods.POST,
    url: '/supplier',
    body: {
      name,
      email,
      phone,
      description,
    },
  });
