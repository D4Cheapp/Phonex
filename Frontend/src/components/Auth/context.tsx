'use client';

import { User } from '@/modules/user/types';

import { createContext, useContext } from 'react';

type AuthContextType = {
  user: User | null;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

type Props = {
  children: React.ReactNode;
  user: User | null;
};

export const AuthProvider = ({ children, user }: Props) => {
  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
