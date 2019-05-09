import React, { useEffect } from 'react';
import { API } from './constants';

const App = () => {
  useEffect(() => {
    API.typeform.getApplications()
      .then((response) => {
        const applications = response.items;
        const filledApplications = applications.filter(a => a.answers);
        console.log(filledApplications);
      });
  });

  return (
    <div>yes-maybe-no </div>
  );
};

export default App;
