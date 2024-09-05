import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  type: "user";
  id: number;
  name: string;
  email: string;
}

interface Guest {
  type: "guest";
}

type AuthState = {
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
}

const getUserFromApi = (): Promise<User | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        type: "user",
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
      });
    }, 2000);
  });
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [auth, setAuth] = useState<AuthState>({ state: "fetching" });

  useEffect(() => {
    const fetchAuthenticatedUser = async () => {
      const authUser = await getUserFromApi();

      console.log({ authUser });
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
