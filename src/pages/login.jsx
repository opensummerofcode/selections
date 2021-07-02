import { useEffect, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'evergreen-ui';
import AuthContext from '@/context/auth';
import { authProvider, auth } from '../firebase';

import styles from '../assets/styles/pending.module.css';

const Login = () => {
  const router = useRouter();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const { user } = useContext(AuthContext);

  const isLoggedIn = !!user;

  useEffect(() => {
    if (!isLoggedIn) return;
    setIsLoggingIn(false);
    router.push('/');
  }, [isLoggedIn, setIsLoggingIn]);

  const doLogin = () => {
    setIsLoggingIn(true);
    auth.signInWithRedirect(authProvider);
  };

  return (
    <div className={styles.pending}>
      <h2 className={styles.title}>Hi!</h2>
      <p>
        Welcome to the Open Summer of Code selections app. <br />
        After you&apos;ve logged in with your Google account, we&apos;ll enable your account so you
        can get started. Nudge @Miet#7556 for verification!
      </p>
      <Button isLoading={isLoggingIn} onClick={doLogin} appearance="primary">
        Log in
      </Button>
      <div className={styles.logo}>
        <img src="/img/osoc.png" alt="Open Summer of Code logo" />
      </div>
    </div>
  );
};

export default Login;
