import { useEffect } from 'react';
import { useRouter } from 'next/router';
import useAuth from './useAuth';

export default function useRequireAuth(userShouldNotBePending = true, redirectUrl = '/login') {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push(redirectUrl);
    if (userShouldNotBePending && user && user.isPending) router.push('/pending');
  }, [userShouldNotBePending, user, router]);

  return user;
}
