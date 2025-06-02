import { getShopList } from '@/modules/shop/get-shop-list';
import { getUserList } from '@/modules/user/get-user-list';
import { UsersPage } from 'pages/users/UserPage';

const Page = async () => {
  const userList = await getUserList({});
  const shops = await getShopList({});
  return <UsersPage users={userList} shops={shops} />;
};

export default Page;
