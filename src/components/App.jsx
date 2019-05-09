import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import {
  authProvider, auth, db, authPersistence
} from '../firebase';
import Students from './Students';
import Student from '../models/Student';

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [students, setStudents] = useState([]);

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
      .then((response) => {
        const existingUser = response.data();
        return setUser({
          displayName: localUser.displayName,
          email: localUser.email,
          uid: localUser.uid,
          pending: (existingUser) ? existingUser.pending : true,
          admin: (existingUser) ? existingUser.admin : false
        });
      })
      .then(() => db.collection('students').get())
      .then((snapshot) => {
        const gotStudents = [];
        snapshot.forEach((doc) => {
          const student = doc.data();
          gotStudents.push(new Student(student));
        });
        setStudents(gotStudents);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/:path(|index|home|start)" render={() => <Students students={students} />} />
        <Route render={() => <p>Page not found</p>} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
