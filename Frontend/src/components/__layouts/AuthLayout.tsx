import { Auth } from 'components/Auth/Auth';
import { Footer } from 'components/Footer/Footer';
import { Navbar } from 'components/Navbar/Navbar';
import { Roles } from 'constants/roles';

type Props = {
  role?: Roles;
  children: React.ReactNode;
};

export const AuthLayout = ({ role, children }: Props) => (
  <Auth role={role}>
    <Navbar />
    {children}
    <Footer />
  </Auth>
);
