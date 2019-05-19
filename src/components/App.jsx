import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import {
  authProvider, auth, db, authPersistence
} from '../firebase';
import Students from './Students';
import Pending from './Pending';

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const getUser = uid => db.collection('users').doc(uid).get();

  useEffect(() => {
    auth.onAuthStateChanged(async (rawUser) => {
      if (rawUser) {
        const user = await getUser(rawUser.uid);
        await setCurrentUser(user.data());
      }
      return auth.setPersistence(authPersistence)
        .then(() => auth.signInWithPopup(authProvider))
        .then(response => getUser(response.user.uid))
        .then(doc => setCurrentUser(doc.data()))
        .catch(console.error);
    });
  }, []);

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/:path(|index|home|start)" render={() => <Students user={currentUser} />} />
        <Route path="/pending" component={Pending} />
        <Route render={() => <p>Page not found</p>} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
