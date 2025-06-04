import { Roles } from 'constants/roles';
import { AuthLayout } from 'layouts/AuthLayout';

const Layout = ({ children }: { children: React.ReactNode }) => (
  <AuthLayout roles={[Roles.ADMIN, Roles.MANAGER, Roles.CASHIER]}>{children}</AuthLayout>
);

export default Layout;
