import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { auth, db } from '../firebase';
import AuthContext from '../context/auth';

import Dashboard from './Dashboard';
import Login from './Login';
import Pending from './Pending';
import UserManagement from './UserManagement';
import PrivateRoute from './PrivateRoute';

import { User } from '../models';

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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
          <PrivateRoute path="/:path(|index|home|start)" guarded component={Dashboard} />
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
            render={(props) => <Login {...props} isLoggedIn={!!currentUser} />}
          />
          <Route render={() => <p>Page not found</p>} />
        </Switch>
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

export default App;
