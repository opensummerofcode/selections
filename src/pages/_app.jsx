import { useState, useEffect } from 'react';
import Head from 'next/head';
import { auth, db } from '@/firebase';
import AuthContext from '@/context/auth';

import Header from '@/components/Header';
import { User } from '@/models';

import 'normalize.css';
import '@/assets/styles/index.css';

const App = ({ Component, pageProps }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const logout = () => {
    auth.signOut().then(() => setCurrentUser(null));
  };

  const authContext = {
    user: currentUser,
    setAuthenticatedUser: setCurrentUser,
    isLoading
  };

  useEffect(() => {
    auth.onAuthStateChanged(async (rawUser) => {
      if (!rawUser) {
        setIsLoading(false);
        return setCurrentUser(null);
      }
      return db
        .collection('users')
        .doc(rawUser.uid)
        .onSnapshot((doc) => {
          const user = doc.data();
          if (!user) return;
          setCurrentUser(new User(user));
          setIsLoading(false);
        });
    });
  }, []);

  if (isLoading) return <p />;

  return (
    <AuthContext.Provider value={authContext}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Selections | Open Summer of Code</title>
      </Head>
      <Header user={currentUser} logout={logout} />
      <Component {...pageProps} />
    </AuthContext.Provider>
  );
};

export default App;
