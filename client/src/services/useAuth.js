import { useEffect } from 'react';
import { useQuery } from 'urql';
import create from 'zustand';
import { useRouter } from 'next/router';
import { auth, authProvider } from '@/firebase';
import User from '@/models/User';
import { queries } from 'common';

const useStore = create((set) => ({
  user: null,
  isLoggingIn: false,
  isLoading: true,
  finishLoading: () => set({ isLogging: false, isLoading: false }),
  setUser: (user) => set({ user: user ? new User(user) : null }),
  login: () => auth.signInWithRedirect(authProvider)
}));

export default function useAuth() {
  const [result] = useQuery({ query: queries.me });

  const { user, isLoggingIn, finishLoading, login, isLoading } = useStore();
  const router = useRouter();

  useEffect(() => {
    finishLoading();
  }, []);

  useEffect(() => {
    if (user && user.isPending) router.push('/pending');
  }, [user, isLoading]);

  const logout = async () => {
    await auth.signOut();
    router.push('/login');
  };

  return { user, logout, login, isLoading, isLoggingIn };
}
