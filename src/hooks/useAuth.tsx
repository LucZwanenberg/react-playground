import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getUserFromApi } from './getUserFromApi';

export interface User {
  type: "user";
  id: number;
  name: string;
  email: string;
}

export interface Guest {
  type: "guest";
}

export type AuthState = {
  state: "fetching"
} | {
  state: "done";
  auth: User | Guest;
};


interface AuthContextType {
  auth: AuthState;
  setAuth: React.Dispatch<React.SetStateAction<AuthState>>;
}

const AuthContext = createContext<AuthContextType>({
  auth: { state: "fetching" },
  setAuth: () => { }
});

interface AuthProviderProps {
  children: ReactNode;
  getUser: () => Promise<User | Guest | null>;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children, getUser }) => {
  const [auth, setAuth] = useState<AuthState>({ state: "fetching" });

  useEffect(() => {
    const fetchAuthenticatedUser = async () => {
      const authUser = await getUser();

      if (!authUser) return;

      setAuth({
        state: "done",
        auth: authUser
      });
    };

    fetchAuthenticatedUser();
  }, []);

  return <AuthContext.Provider value={{ auth, setAuth }}>
    {children}
  </AuthContext.Provider>;
};

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context)
    throw new Error('useAuth must be used within an AuthProvider');

  return context;
};

export default useAuth;
