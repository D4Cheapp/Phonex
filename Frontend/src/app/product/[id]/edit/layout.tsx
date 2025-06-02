import { Auth } from 'components/Auth/Auth';
import { Roles } from 'constants/roles';

const Layout = ({ children }: { children: React.ReactNode }) => (
  <Auth roles={[Roles.MANAGER, Roles.ADMIN]}>{children}</Auth>
);

export default Layout;
