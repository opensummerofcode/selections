import { useEffect } from 'react';
import { useAuth } from '@/hooks';

export default function Logout() {
  const { logout } = useAuth();

  useEffect(() => {
    logout();
  }, []);

  return <p />;
}
