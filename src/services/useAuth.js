import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { auth, authProvider, db } from '@/firebase';
import User from '@/models/User';

export default function useAuth() {
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
          if (!userData) return null;
          setUser(new User(userData));
          setIsLoggingIn(false);
          return setIsLoading(false);
        });
    });
    return unsubscribe;
  }, []);

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
