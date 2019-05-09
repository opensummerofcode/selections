import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { API } from '../constants';
import { db } from '../firebase';
import Students from './Students';
import SignIn from './SignIn';

const App = () => {
  useEffect(() => {
    API.typeform.getApplications()
      .then((response) => {
        const applications = response.items;
        const filledApplications = applications.filter(a => a.answers);
        console.log(filledApplications);
      });

    db.collection('students').get().then((snapshot) => {
      snapshot.forEach(doc => console.log(doc.data()));
    });
  });

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/:path(|index|home|start)" component={Students} />
        <Route path="/login" component={SignIn} />
        <Route render={() => <p>Page not found</p>} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
