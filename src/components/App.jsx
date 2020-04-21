import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { auth, db } from '../firebase';
import AuthContext from '../context/auth';

import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import UserManagement from '../pages/UserManagement';
import Pending from '../pages/Pending';

import Header from './Header';
import PrivateRoute from './PrivateRoute';

import { User } from '../models';

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged(async (rawUser) => {
      if (!rawUser) {
        setIsLoading(false);
        return setCurrentUser(null);
      }
      return db
        .collection('users')
        .doc(rawUser.uid)
        .onSnapshot((doc) => {
          const user = doc.data();
          if (!user) return;
          setCurrentUser(new User(user));
          setIsLoading(false);
        });
    });
  }, []);

  const logout = () => {
    auth.signOut().then(() => setCurrentUser(null));
  };

  const authContext = {
    user: currentUser,
    setAuthenticatedUser: setCurrentUser,
    isLoading
  };

  console.log('oi');

  if (isLoading) return <p />;
  return (
    <AuthContext.Provider value={authContext}>
      <BrowserRouter>
        <Header user={currentUser} logout={logout} />
        <Switch>
          <PrivateRoute path="/:path(|index|home|start)" exact guarded component={Dashboard} />
          <PrivateRoute path="/student/:id/:name" guarded component={Dashboard} />
          <PrivateRoute
            path="/manage-users"
            admin
            component={(props) => <UserManagement {...props} user={currentUser} />}
          />
          <PrivateRoute
            path="/pending"
            component={(props) => <Pending {...props} user={currentUser} />}
          />
          <Route
            path="/login"
            render={(props) => (
              <Login
                {...props}
                isLoggingIn={isLoggingIn}
                setIsLoggingIn={setIsLoggingIn}
                isLoggedIn={!!currentUser}
              />
            )}
          />
          <Route render={() => <p>Page not found</p>} />
        </Switch>
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

export default App;
