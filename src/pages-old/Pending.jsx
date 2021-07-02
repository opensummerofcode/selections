import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { User } from '../models';

import styles from '../assets/styles/pending.module.css';
import logo from '../assets/img/osoc.png';

const Pending = ({ user }) => {
  if (user && !user.isPending) return <Redirect to="/" />;
  return (
    <div className={styles.pending}>
      <h2 className={styles.title}>Hey {user && user.name} :)</h2>
      <p>
        To keep student data secure, your account is pending. We&apos;ll enable your account soon!
      </p>
      <div className={styles.logo}>
        <img src={logo} alt="Open Summer of Code logo" />
      </div>
    </div>
  );
};

Pending.propTypes = {
  user: PropTypes.instanceOf(User)
};

export default Pending;
