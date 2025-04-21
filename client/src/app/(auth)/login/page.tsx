'use client';

import AuthForm from '@/components/auth/AuthForm';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const handleLogin = async (data: { email: string; password: string }) => {
    const { email, password } = data;
    await login(email, password);
  };
  // return <AuthForm type="login" onSubmit={login} />;
  return <AuthForm type="login" onSubmit={handleLogin} />;
}