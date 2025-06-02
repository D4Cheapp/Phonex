import { ApiMethods, request } from 'utils/request';

export const logout = async () =>
  await request({
    method: ApiMethods.DELETE,
    url: '/user/logout',
  });
