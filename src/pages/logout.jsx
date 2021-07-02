import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import AuthContext from '@/context/auth';
import { auth } from '@/firebase';

export default function Logout() {
  const { setAuthenticatedUser } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    auth.signOut().then(() => {
      setAuthenticatedUser(null);
      router.push('/');
    });
  }, []);

  return <p />;
}
