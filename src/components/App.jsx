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

  const getUser = uid => db.collection('users').doc(uid).get();

  const login = () => auth.setPersistence(authPersistence)
    .then(() => auth.signInWithPopup(authProvider))
    .then(response => getUser(response.user.uid))
    .then(doc => setCurrentUser(doc.data()))
    .catch(console.error);

  const getStudents = () => {
    db.collection('students').get()
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
  };

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        await setCurrentUser(user);
        return getStudents();
      }
      return login();
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
