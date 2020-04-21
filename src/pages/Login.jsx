import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button } from 'evergreen-ui';
import { authProvider, auth } from '../firebase';

import styles from '../assets/styles/pending.module.css';
import logo from '../assets/img/osoc.png';

const Login = ({ history, isLoggingIn, isLoggedIn, setIsLoggingIn }) => {
  useEffect(() => {
    if (!isLoggedIn) return;
    history.push('/');
    setIsLoggingIn(false);
  }, [isLoggedIn, history]);

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
        can get started.
      </p>
      <Button isLoading={isLoggingIn} onClick={doLogin} appearance="primary">
        Log in
      </Button>
      <div className={styles.logo}>
        <img src={logo} alt="Open Summer of Code logo" />
      </div>
    </div>
  );
};

Login.propTypes = {
  // eslint-disable-next-line
  history: PropTypes.object,
  isLoggedIn: PropTypes.bool.isRequired,
  isLoggingIn: PropTypes.bool.isRequired,
  setIsLoggingIn: PropTypes.func.isRequired
};

export default withRouter(Login);
