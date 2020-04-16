import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { authProvider, auth, db, authPersistence } from '../firebase';
import Dashboard from './Dashboard';
import Login from './Login';
import AuthContext from '../context/auth';
import PrivateRoute from './PrivateRoute';

const App = () => {
  const [authFailed, setFailure] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getUser = (uid) => db.collection('users').doc(uid).get();

  auth.getRedirectResult().catch((err) => {
    setIsLoading(false);
  });

  useEffect(() => {
    auth.onAuthStateChanged(async (rawUser) => {
      if (!rawUser) setCurrentUser(null);

      const user = await getUser(rawUser.uid);
      setCurrentUser(user.data());
      return setIsLoading(false);
    });
  }, []);

  const authContext = {
    user: currentUser,
    setAuthenticatedUser: setCurrentUser,
    isLoading,
    authFailed
  };

  return (
    <AuthContext.Provider value={authContext}>
      <BrowserRouter>
        {!isLoading && (
          <Switch>
            <PrivateRoute path="/:path(|index|home|start)" component={Dashboard} />
            <Route path="/login" component={Login} />
            <Route render={() => <p>Page not found</p>} />
          </Switch>
        )}
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

export default App;
