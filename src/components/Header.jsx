import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import styles from '@/assets/styles/header.module.css';
import { User } from '../models';

const Header = ({ user }) => (
  <header className={styles.header}>
    <nav className={styles.navigation}>
      <h1 className={styles.title}>Selections</h1>
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
              <a>Manage users</a>
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

Header.propTypes = {
  user: PropTypes.instanceOf(User)
};

export default Header;
