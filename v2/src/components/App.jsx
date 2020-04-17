import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { auth } from '../firebase';
import Dashboard from './Dashboard';
import Login from './Login';
import AuthContext from '../context/auth';
import PrivateRoute from './PrivateRoute';
import { User } from '../models';

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged(async () => {
      const user = auth.currentUser;
      if (!user) {
        setIsLoading(false);
        return setCurrentUser(null);
      }

      const token = await user.getIdTokenResult();
      setCurrentUser(new User(user, token.claims));
      return setIsLoading(false);
    });
  }, []);

  const authContext = {
    user: currentUser,
    setAuthenticatedUser: setCurrentUser,
    isLoading
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
