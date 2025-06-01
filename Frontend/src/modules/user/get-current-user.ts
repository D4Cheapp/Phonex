import { ApiMethods, request } from 'utils/request';
import { User } from './types';

export const getCurrentUser = () =>
  request<User>({
    method: ApiMethods.GET,
    url: '/user/current',
  });
