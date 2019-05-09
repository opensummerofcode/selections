import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import {
  authProvider, auth, db, authPersistence
} from '../firebase';
import Students from './Students';

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);

  const setUser = async (user) => {
    await db.collection('users').doc(user.uid).set(user);
    setCurrentUser(user);
  };

  const getUser = uid => db.collection('users').doc(uid).get();

  useEffect(() => {
    let localUser;
    auth.setPersistence(authPersistence)
      .then(() => auth.signInWithPopup(authProvider))
      .then((result) => {
        const { user } = result;
        localUser = user;
        return getUser(user.uid);
      })
      .then(existingUser => setUser({
        displayName: localUser.displayName,
        email: localUser.email,
        uid: localUser.uid,
        pending: (existingUser.pending) ? existingUser.pending : true
      }))
      .then(() => {
        db.collection('students').get().then((snapshot) => {
          // snapshot.forEach(doc => console.log(doc.data()));
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/:path(|index|home|start)" component={Students} />
        <Route render={() => <p>Page not found</p>} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
