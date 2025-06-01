import { getCurrentUser } from '@/modules/user/get-current-user';
import { Roles } from 'constants/roles';
import { Routes } from 'constants/routes';
import { redirect } from 'next/navigation';
import { AuthProvider } from './context';

type Props = {
  role: Roles;
  children: React.ReactNode;
};

export const Auth = async ({ role, children }: Props) => {
  const user = await getCurrentUser();

  const isInvalidRole = user && user.role.name !== role;
  const isNotAuthenticated = !user;

  if (isNotAuthenticated || isInvalidRole) {
    redirect(Routes.login);
  }

  return <AuthProvider user={user}>{children}</AuthProvider>;
};
