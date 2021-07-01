import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { auth, db } from '../firebase';
import StudentProvider from './StudentProvider';
import AuthContext from '../context/auth';

import Students from '../pages/Students';
import Projects from '../pages/Projects';
import Login from '../pages/Login';
import UserManagement from '../pages/UserManagement';
import Pending from '../pages/Pending';

import Header from './Header';
import PrivateRoute from './PrivateRoute';
import { User } from '../models';

this.setState({});

const App = ({ Component, pageProps }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const logout = () => {
    auth.signOut().then(() => setCurrentUser(null));
  };

  const authContext = {
    user: currentUser,
    setAuthenticatedUser: setCurrentUser,
    isLoading
  };

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

  if (isLoading) return <p />;

  return (
    <AuthContext.Provider value={authContext}>
      <Header user={currentUser} logout={logout} />
      <Component {...pageProps} />
    </AuthContext.Provider>
  );
};

App.propTypes = {};

export default App;
