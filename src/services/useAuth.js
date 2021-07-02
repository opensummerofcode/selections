import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { auth, authProvider, db } from '@/firebase';
import User from '@/models/User';

export default function useAuth(props = { redirectTo: null }) {
  const { redirectTo = null } = props;
  const router = useRouter();

  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((rawUser) => {
      if (!rawUser) {
        setIsLoading(false);
        return setUser(null);
      }
      return db
        .collection('users')
        .doc(rawUser.uid)
        .onSnapshot((doc) => {
          const userData = doc.data();
          setIsLoggingIn(false);
          setIsLoading(false);
          if (!userData) return null;
          return setUser(new User(userData));
        });
    });
    return unsubscribe;
  }, [auth]);

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

  const logout = () => {
    setIsLoading(true);
    auth.signOut().then(() => {
      setUser(null);
      setIsLoading(false);
      router.push('/');
    });
  };

  const login = async () => {
    setIsLoggingIn(true);
    return auth.signInWithRedirect(authProvider);
  };

  return { user, logout, isLoading, login, isLoggingIn };
}
