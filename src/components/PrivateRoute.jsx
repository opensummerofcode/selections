import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../context/auth';

const PrivateRoute = ({
  component: Component = null,
  guarded,
  admin,
  children = null,
  ...rest
}) => {
  const { user } = useContext(AuthContext);

  let redirect = null;
  if (!user) redirect = '/login';
  else if (user.isPending && guarded) redirect = '/pending';
  else if (!user.isAdmin && admin) redirect = '/';

  return (
    <Route
      {...rest}
      render={(props) => {
        if (redirect) return <Redirect to={redirect} />;
        return Component ? <Component {...props} /> : children;
      }}
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.func,
  children: PropTypes.node,
  guarded: PropTypes.bool,
  admin: PropTypes.bool
};

export default PrivateRoute;
