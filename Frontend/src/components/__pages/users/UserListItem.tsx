import { handleRoleName } from '@/modules/user/handle-role-name';
import { User } from '@/modules/user/types';

export const UserListItem = ({ user }: { user: User }) => {
  console.log(user);

  return (
    <div className="flex justify-between items-center p-4 pl-10 pr-10 max-md:pl-5 max-md:pr-5 gap-4 border-medium shadow-sm rounded-xl hover:bg-gray-100 transition-all cursor-pointer">
      <div>
        <p>{user.name}</p>
        <p className="text-gray-500">{user.email}</p>
      </div>
      <div className="flex gap-6">
        {user.shop && <p className="text-gray-500">{user.shop.name}</p>}
        <p className="text-gray-500">{handleRoleName(user.role.name)}</p>
      </div>
    </div>
  );
};
