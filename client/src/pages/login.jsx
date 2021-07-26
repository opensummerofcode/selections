import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks';
import { API_URL } from '@/constants';
import { useQuery } from 'urql';
import { queries } from 'common';
import SocialButton from '../components/SocialButton';

import styles from '../assets/styles/pending.module.css';

export default function Login() {
  const router = useRouter();
  const [result] = useQuery({ query: queries.me });
  // const { user } = useAuth();

  /*
  useEffect(() => {
    if (user && !user.isPending) router.push('/');
  }, [user]);
*/
  return (
    <div className={styles.pending}>
      <h2 className={styles.title}>Hi!</h2>
      <p>
        Welcome to the Open Summer of Code selections app. <br />
        After you&apos;ve logged in with your social account of choice, we&apos;ll enable your
        account so you can get started. Nudge @Miet#7556 for verification!
      </p>
      <SocialButton href={`${API_URL}/auth/github`} github>
        Log in with GitHub
      </SocialButton>

      <div className={styles.logo}>
        <img src="/img/osoc.png" alt="Open Summer of Code logo" />
      </div>
    </div>
  );
}
