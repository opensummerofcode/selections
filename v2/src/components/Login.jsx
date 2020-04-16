import React from 'react';
import { authProvider, auth, db, authPersistence } from '../firebase';

const Login = () => {
  const doLogin = () => {
    auth.signInWithRedirect(authProvider);
  };

  return (
    <button type="button" onClick={doLogin}>
      Log in
    </button>
  );
};

export default Login;
