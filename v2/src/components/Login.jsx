import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { authProvider, auth } from '../firebase';

const Login = ({ history, isLoggedIn }) => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) return;
    history.push('/');
    setIsLoggingIn(false);
  }, [isLoggedIn]);

  const doLogin = () => {
    setIsLoggingIn(true);
    auth.signInWithRedirect(authProvider);
  };

  return (
    <button type="button" onClick={doLogin}>
      Log in
    </button>
  );
};

Login.propTypes = {
  // eslint-disable-next-line
  history: PropTypes.object,
  isLoggedIn: PropTypes.bool.isRequired
};

export default withRouter(Login);
