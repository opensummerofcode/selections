import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import AuthContext from '../context/auth';

const Pending = ({ history }) => {
  const { user, isLoading } = useContext(AuthContext);
  if (isLoading) return <p />;
  if (user && (!user.pending && ('pending' in user))) history.push('/');
  return (
    <div>
      <h2>Hey {user && user.displayName} :)</h2>
      {!user && <p>Please log in via the pop-up window</p>}
      {user && (user.pending || !('pending' in user)) && (
        <p>Your account is pending. Shoot @michiel a message to start selecting students.</p>
      )}
    </div>
  );
};

Pending.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired
};

export default withRouter(Pending);
