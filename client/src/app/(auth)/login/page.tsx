import AuthForm from '@/components/auth/AuthForm';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  return <AuthForm type="login" onSubmit={login} />;
}