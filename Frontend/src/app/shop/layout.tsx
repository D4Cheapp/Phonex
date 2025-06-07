import { AuthLayout } from 'layouts/AuthLayout';

const Page = ({ children }: { children: React.ReactNode }) => (
  <AuthLayout roles={[]}>{children}</AuthLayout>
);

export default Page;
