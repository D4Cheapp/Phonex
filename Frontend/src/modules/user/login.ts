import { ApiMethods, request } from '@/utils/request';

type Props = {
  email: string;
  password: string;
};

export const login = (props: Props) =>
  request({
    method: ApiMethods.POST,
    url: '/user/login',
    body: props,
  });
