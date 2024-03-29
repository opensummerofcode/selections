import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks';

import styles from '@/assets/styles/header.module.css';

const Header = () => {
  const { user } = useAuth();
  return (
    <header className={styles.header}>
      <nav className={styles.navigation}>
        <Link href="/">
          <a className={styles.title}>Selections</a>
        </Link>

        <ul className={styles.navitems}>
          {user && !user.isPending && (
            <>
              <li>
                <Link href="/">
                  <a>Select students</a>
                </Link>
              </li>
              <li>
                <Link href="/projects">
                  <a>Projects</a>
                </Link>
              </li>
            </>
          )}
          {user && user.isAdmin && (
            <li>
              <Link href="/manage-users">
                <a>Admin panel</a>
              </Link>
            </li>
          )}
          {user && (
            <li>
              <Link href="/logout">
                <a>Log out</a>
              </Link>
            </li>
          )}
          {!user && (
            <li>
              <Link href="/login">
                <a>Log in</a>
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
