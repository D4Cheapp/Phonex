import { Auth } from 'components/Auth/Auth';
import { Footer } from 'components/Footer/Footer';
import { Navbar } from 'components/Navbar/Navbar';
import { Roles } from 'constants/roles';

type Props = {
  roles: Roles[];
  children: React.ReactNode;
};

export const AuthLayout = ({ roles, children }: Props) => (
  <Auth roles={roles}>
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <section className="max-w-[1024px] w-full flex-1 min-h-full pl-6 pr-6 mx-auto pb-16">
        {children}
      </section>
      <Footer />
    </div>
  </Auth>
);
