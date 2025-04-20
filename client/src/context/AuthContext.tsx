'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { setCookie, deleteCookie } from 'cookies-next';
import api from '@/lib/api';

type User = {
  id: string;
  name: string;
  email: string;
  role: 'buyer' | 'vendor' | 'rider';
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
};

type RegisterData = {
  name: string;
  email: string;
  password: string;
  role: string;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const { data } = await api.get('/auth/me');
        setUser(data.data);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (email: string, password: string) => {
    const { data } = await api.post('/auth/login', { email, password });
    setCookie('token', data.token, { maxAge: 60 * 60 * 24 * 30 }); // 30 days
    setUser(data.user);
    router.push(`/dashboard/${data.user.role}`);
  };

  const register = async (userData: RegisterData) => {
    const { data } = await api.post('/auth/register', userData);
    setCookie('token', data.token, { maxAge: 60 * 60 * 24 * 30 }); // 30 days
    setUser(data.user);
    router.push(`/dashboard/${data.user.role}`);
  };

  const logout = async () => {
    await api.post('/auth/logout');
    deleteCookie('token');
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAuthenticated: !!user,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);