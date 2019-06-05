import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import AuthContext from '../context/auth';
import logo from '../assets/osoc.png';

const Pending = ({ history }) => {
  const { user, isLoading } = useContext(AuthContext);
  if (isLoading) return <p />;
  if (user && (!user.pending && ('pending' in user))) history.push('/');
  return (
    <div className="pending">
      <h2>Hey {user && user.displayName} :)</h2>
      {!user && <p>Please log in via the pop-up window &amp; refresh the page</p>}
      {user && (user.pending || !('pending' in user)) && (
        <p>
          For security reasons, your account is pending.
          Shoot @michiel a message on Slack to start selecting students.
        </p>
      )}
      <div className="logo-container"><img src={logo} alt="Open Summer of Code logo" /></div>
    </div>
  );
};

Pending.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired
};

export default withRouter(Pending);
