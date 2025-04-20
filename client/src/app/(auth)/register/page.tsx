import AuthForm from '@/components/auth/AuthForm';
import { useAuth } from '@/context/AuthContext';

export default function RegisterPage() {
  const { register } = useAuth();
  return <AuthForm type="register" onSubmit={register} />;
}