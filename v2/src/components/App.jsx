import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { auth, db } from '../firebase';
import Dashboard from './Dashboard';
import Login from './Login';
import AuthContext from '../context/auth';
import PrivateRoute from './PrivateRoute';

const App = () => {
  const [authFailed, setFailure] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getUser = (uid) => db.collection('users').doc(uid).get();

  useEffect(() => {
    auth.onAuthStateChanged(async (rawUser) => {
      if (!rawUser) {
        setIsLoading(false);
        return setCurrentUser(null);
      }

      const user = await getUser(rawUser.uid);
      console.log(user.data());
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

  if (isLoading) return <p />;
  return (
    <AuthContext.Provider value={authContext}>
      <BrowserRouter>
        <Switch>
          <PrivateRoute path="/:path(|index|home|start)" component={Dashboard} />
          <Route
            path="/login"
            render={(props) => <Login {...props} isLoggedIn={!!currentUser} />}
          />
          <Route render={() => <p>Page not found</p>} />
        </Switch>
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

export default App;
