import { Button } from '@heroui/react';
import { Auth } from 'components/Auth/Auth';
import { Roles } from 'constants/roles';

const Home = () => {
  return (
    <Auth role={Roles.ADMIN}>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1>Home</h1>
        <Button>Button</Button>
      </div>
    </Auth>
  );
};

export default Home;
