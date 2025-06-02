import { Shop } from '@/modules/shop/types';
import { User } from '@/modules/user/types';

import { UsersListProvider } from './context';
import { UsersFilter } from './UsersFilter';
import { UsersList } from './UsersList';

type Props = {
  shops: Shop[] | null;
  users: User[] | null;
};

export const UsersPage = ({ users, shops }: Props) => {
  return (
    <UsersListProvider initialUsers={users}>
      <h1 className="text-3xl font-bold mb-10 mt-5">Пользователи</h1>
      <UsersFilter shops={shops} />
      <UsersList />
    </UsersListProvider>
  );
};
