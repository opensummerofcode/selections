import { useEffect } from 'react';
import { useRouter } from 'next/router';
import create from 'zustand';
import { auth, authProvider, db } from '@/firebase';
import User from '@/models/User';

const useStore = create((set) => ({
  user: null,
  isLoggingIn: false,
  isLoading: true,
  finishLoading: () => set({ isLogging: false, isLoading: false }),
  startLoading: () => set({ isLoading: true }),
  setUser: (user) => set({ user: new User(user) }),
  login: () => auth.signInWithRedirect(authProvider)
}));

export default function useAuth() {
  const router = useRouter();
  const { user, isLoggingIn, finishLoading, setUser, startLoading, login, isLoading } = useStore();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((rawUser) => {
      if (!rawUser) {
        finishLoading();
        return setUser(null);
      }
      return db
        .collection('users')
        .doc(rawUser.uid)
        .onSnapshot((doc) => {
          const userData = doc.data();
          if (!userData) return null;
          setUser(userData);
          return finishLoading();
        });
    });
    return unsubscribe;
  }, []);

  const logout = () => {
    startLoading();
    auth.signOut().then(() => {
      setUser(null);
      finishLoading();
      router.push('/');
    });
  };

  return { user, logout, isLoading, login, isLoggingIn };
}
