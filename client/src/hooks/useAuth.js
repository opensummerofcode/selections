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
  finishLoading: () => set({ isLoading: false }),
  setUser: (user) => set({ user: user ? new User(user) : null }),
  login: () => auth.signInWithRedirect(authProvider)
}));

export default function useAuth() {
  const [{ data, fetching }] = useQuery({ query: queries.me });

  const { user, isLoggingIn, setUser, finishLoading, login, isLoading } = useStore();
  const router = useRouter();
  console.log(data);
  useEffect(() => {
    if (!fetching) {
      finishLoading();
      return;
    }
    if (data) setUser(data.me);
  }, [fetching, data]);

  const logout = async () => {
    await auth.signOut();
    router.push('/login');
  };

  return { user, logout, login, isLoading, isLoggingIn };
}
