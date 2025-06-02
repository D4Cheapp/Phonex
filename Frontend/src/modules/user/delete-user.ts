import { ApiMethods, request } from 'utils/request';

export const deleteUser = async (id: number) =>
  await request({
    method: ApiMethods.DELETE,
    url: `/user/${id}`,
  });
