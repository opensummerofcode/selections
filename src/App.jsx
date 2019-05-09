import React, { useEffect } from 'react';
import { API } from './constants';
import { db } from './firebase';

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
    <div>yes-maybe-no </div>
  );
};

export default App;
