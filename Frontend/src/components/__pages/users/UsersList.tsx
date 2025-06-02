'use client';

import { useUsersListContext } from './context';
import { UserListItem } from './UserListItem';

export const UsersList = () => {
  const { users } = useUsersListContext();

  return (
    <div className="flex flex-col gap-4 mt-10">
      {users?.map(user => <UserListItem key={user.id} user={user} />)}
    </div>
  );
};
