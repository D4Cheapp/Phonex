'use client';

import {
  Button,
  Navbar as HeroNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from '@heroui/react';
import { useAuthContext } from 'components/Auth/context';
import { ProfileModal } from 'components/Modals/ProfileModal';
import { Roles } from 'constants/roles';
import { adminRoutes, cashierRoutes, managerRoutes, Routes } from 'constants/routes';

import { useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import AdminIcon from 'icons/admin.svg';
import CashierIcon from 'icons/cashier.svg';
import ManagerIcon from 'icons/manager.svg';
import PhoneIcon from 'icons/phone.svg';
import ProfileIcon from 'icons/profile.svg';

import { NavbarDropdown } from './NavbarDropdown';

export const Navbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const { user } = useAuthContext();

  const { push } = useRouter();

  const isAdminAccess = !!user?.id && user.role.name === Roles.ADMIN;
  const isManagerAccess = !!user?.id && (user.role.name === Roles.MANAGER || isAdminAccess);
  const isCashierAccess =
    !!user?.id && (user.role.name === Roles.CASHIER || isAdminAccess || isManagerAccess);

  const handleProfileClick = () => setIsProfileOpen(prev => !prev);

  const handleHomeClick = () => push(Routes.home);

  return (
    <HeroNavbar isBordered>
      <NavbarBrand onClick={handleHomeClick} className="cursor-pointer">
        <PhoneIcon className="w-6 h-6" />
        <p className="font-semibold max-md:hidden">Phonex</p>
      </NavbarBrand>
      <NavbarContent justify="center" className="flex gap-[5vw] max-sm:gap-0">
        <NavbarDropdown
          title="Меню кассира"
          haveAccess={isCashierAccess}
          routes={cashierRoutes}
          icon={<CashierIcon />}
        />
        <NavbarDropdown
          title="Меню менеджера"
          haveAccess={isManagerAccess}
          routes={managerRoutes}
          icon={<ManagerIcon />}
        />
        <NavbarDropdown
          title="Меню администратора"
          haveAccess={isAdminAccess}
          routes={adminRoutes}
          icon={<AdminIcon />}
        />
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          {user ? (
            <>
              <ProfileIcon className="w-6 h-6 cursor-pointer" onClick={handleProfileClick} />
              <ProfileModal user={user} isOpen={isProfileOpen} onClose={handleProfileClick} />
            </>
          ) : (
            <Link href={Routes.login}>
              <Button color="primary">Войти</Button>
            </Link>
          )}
        </NavbarItem>
      </NavbarContent>
    </HeroNavbar>
  );
};
