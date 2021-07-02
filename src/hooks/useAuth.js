import { useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import AuthContext from '@/context/auth';

export default function useAuth({ redirectTo = null }) {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (user && user.isPending) {
      router.push('/pending');
      return;
    }

    if (redirectTo && !user) {
      router.push(redirectTo);
      return;
    }

    if (!user) {
      router.push('/login');
    }
  }, [user, redirectTo]);

  return { user };
}
