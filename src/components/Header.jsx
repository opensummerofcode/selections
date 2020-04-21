import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { User } from '../models';

import styles from '../assets/styles/header.module.css';

const Header = ({ user, logout }) => (
  <header className={styles.header}>
    <nav className={styles.navigation}>
      <h1 className={styles.title}>Selections</h1>
      <ul className={styles.navitems}>
        {user && !user.isPending && (
          <li>
            <Link to="/">Select students</Link>
          </li>
        )}
        {user && user.isAdmin && (
          <li>
            <Link to="/manage-users">Manage users</Link>
          </li>
        )}
        {user && (
          <li>
            <Link to="/" onClick={logout}>
              Log out
            </Link>
          </li>
        )}
        {!user && (
          <li>
            <Link to="/login">Log in</Link>
          </li>
        )}
      </ul>
    </nav>
  </header>
);

Header.propTypes = {
  user: PropTypes.instanceOf(User),
  logout: PropTypes.func.isRequired
};

export default Header;
