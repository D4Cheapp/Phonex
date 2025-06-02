import { Shop } from '@/modules/shop/types';
import { User } from '@/modules/user/types';

import { AddUserButton } from './AddUserButton';
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
      <div className="flex justify-between items-start gap-5 mb-10 mt-10">
        <h1 className="text-3xl font-bold">Пользователи</h1>
        <AddUserButton shops={shops} />
      </div>
      <UsersFilter shops={shops} />
      <UsersList shops={shops} />
    </UsersListProvider>
  );
};
