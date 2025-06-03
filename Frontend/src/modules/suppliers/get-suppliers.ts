import { ApiMethods, request } from 'utils/request';

import { Supplier } from './types';

type Props = {
  name?: string;
  email?: string;
};

export const getSuppliers = async ({ name, email }: Props) =>
  request<Supplier[]>({
    method: ApiMethods.GET,
    url: '/supplier',
    body: {
      name,
      email,
    },
  });
