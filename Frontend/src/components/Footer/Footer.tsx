'use client';

import { useAuthContext } from 'components/Auth/context';

export const Footer = () => {
  const { user } = useAuthContext();

  return (
    <footer className="w-full min-h-20 bg-gray-600 text-white">
      <div className="flex max-w-[1024px] p-6 mx-auto justify-around items-center">
        <p>© {new Date().getFullYear()} Phonex</p>
        {user?.shop && (
          <div className="flex flex-col gap-1 items-center">
            <p>Текущий магазин</p>
            <p>{user.shop.address}</p>
          </div>
        )}
      </div>
    </footer>
  );
};
