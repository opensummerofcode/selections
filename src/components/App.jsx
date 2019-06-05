import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import {
  authProvider, auth, db, authPersistence
} from '../firebase';
import AuthContext from '../context/auth';
import Students from './Students';
import Pending from './Pending';

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getUser = uid => db.collection('users').doc(uid).get();

  useEffect(() => {
    auth.onAuthStateChanged(async (rawUser) => {
      if (rawUser) {
        const user = await getUser(rawUser.uid);
        setCurrentUser(user.data());
        return setIsLoading(false);
      }
      return auth.setPersistence(authPersistence)
        .then(() => auth.signInWithPopup(authProvider))
        .then(response => getUser(response.user.uid))
        .then((doc) => {
          setCurrentUser(doc.data());
          return setIsLoading(false);
        })
        .catch((err) => {
          window.location = '/';
          console.error(err);
          setIsLoading(false);
        });
    });
  }, []);

  const authContext = {
    user: currentUser,
    setAuthenticatedUser: setCurrentUser,
    isLoading
  };

  return (
    <AuthContext.Provider value={authContext}>
      <BrowserRouter>
        <Switch>
          <Route path="/:path(|index|home|start)" component={Students} />
          <Route path="/pending" component={Pending} />
          <Route render={() => <p>Page not found</p>} />
        </Switch>
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

export default App;
