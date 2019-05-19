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

  const getUser = uid => db.collection('users').doc(uid).get();

  useEffect(() => {
    auth.onAuthStateChanged(async (rawUser) => {
      if (rawUser) {
        const user = await getUser(rawUser.uid);
        return setCurrentUser(user.data());
      }
      return auth.setPersistence(authPersistence)
        .then(() => auth.signInWithPopup(authProvider))
        .then(response => getUser(response.user.uid))
        .then(doc => setCurrentUser(doc.data()))
        .catch(console.error);
    });
  }, []);

  const authContext = {
    user: currentUser,
    setAuthenticatedUser: setCurrentUser
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
