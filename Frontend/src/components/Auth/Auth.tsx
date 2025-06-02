import { getCurrentUser } from '@/modules/user/get-current-user';
import { Roles } from 'constants/roles';
import { Routes } from 'constants/routes';

import { redirect } from 'next/navigation';

import { AuthProvider } from './context';

type Props = {
  roles?: Roles[];
  children: React.ReactNode;
};

export const Auth = async ({ roles, children }: Props) => {
  const user = await getCurrentUser();

  const isInvalidRole = user && roles && roles.length !== 0 && !roles.includes(user.role.name);
  const isNotAuthenticated = !user?.id;

  if (isNotAuthenticated || isInvalidRole) {
    redirect(Routes.login);
  }

  return <AuthProvider user={user}>{children}</AuthProvider>;
};
