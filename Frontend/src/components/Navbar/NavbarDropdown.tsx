import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  NavbarItem,
} from '@heroui/react';

import Link from 'next/link';

import ChevronIcon from 'icons/chevron.svg';

type Props = {
  haveAccess: boolean;
  title: string;
  routes: { label: string; href: string }[];
  icon: React.ReactNode;
};

export const NavbarDropdown = ({ title, haveAccess, routes, icon }: Props) => {
  return (
    haveAccess && (
      <Dropdown>
        <NavbarItem>
          <DropdownTrigger>
            <Button
              disableRipple
              className="p-0 bg-transparent data-[hover=true]:bg-transparent"
              endContent={
                <span className="mt-1 max-sm:hidden">
                  <ChevronIcon className="w-6 h-6" />
                </span>
              }
              radius="sm"
              variant="light">
              <span className="sm:hidden w-6 h-6">{icon}</span>
              <p className="hidden sm:block">{title}</p>
            </Button>
          </DropdownTrigger>
        </NavbarItem>
        <DropdownMenu>
          {routes.map(({ label, href }) => (
            <DropdownItem key={href}>
              <Link href={href}>{label}</Link>
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    )
  );
};
