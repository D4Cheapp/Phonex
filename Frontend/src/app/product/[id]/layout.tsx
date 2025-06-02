import { Auth } from 'components/Auth/Auth';

const Layout = ({ children }: { children: React.ReactNode }) => <Auth roles={[]}>{children}</Auth>;

export default Layout;
