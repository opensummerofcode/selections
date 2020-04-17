import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../context/auth';

const PrivateRoute = ({ component: Component, guarded, ...rest }) => {
  const { user } = useContext(AuthContext);

  let redirect = null;
  if (!user) redirect = '/login';
  else if (user.isPending && guarded) redirect = '/pending';

  return (
    <Route
      {...rest}
      render={(props) => (redirect ? <Redirect to={redirect} /> : <Component {...props} />)}
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  guarded: PropTypes.bool
};

export default PrivateRoute;
