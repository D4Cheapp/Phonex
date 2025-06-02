import { Roles } from 'constants/roles';
import { AuthLayout } from 'layouts/AuthLayout';

const Layout = ({ children }: { children: React.ReactNode }) => (
  <AuthLayout roles={[Roles.MANAGER, Roles.ADMIN]}>{children}</AuthLayout>
);

export default Layout;
