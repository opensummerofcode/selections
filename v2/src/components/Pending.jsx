import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { User } from '../models';

import styles from '../assets/pending.module.css';
import logo from '../assets/osoc.png';

const Pending = ({ history, user }) => {
  if (user && !user.isPending) history.push('/');
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
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired,
  user: PropTypes.instanceOf(User)
};

export default withRouter(Pending);
