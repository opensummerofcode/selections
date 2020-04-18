import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Table, Select } from 'evergreen-ui';
import { User } from '../models';
import { db } from '../firebase';

import '../assets/styles/user-management.module.css';

const UserManagement = ({ user: currentUser }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const unsubscribe = db.collection('users').onSnapshot((snapshot) => {
      const newUsers = {};
      snapshot.forEach((doc) => {
        const data = doc.data();
        // Don't show currently logged in user
        if (currentUser.id !== data.uid) {
          newUsers[data.uid] = new User(data);
          if (isLoading) setIsLoading(false);
        }
      });
      setUsers(newUsers);
    });
    return unsubscribe;
  }, []);

  const doSearch = (value) => setSearchQuery(value);

  const renderEmptyState = () => {
    return <p>There are no users yet! Other than you of course :)</p>;
  };

  const setRole = (id, val) => {
    const roles = {
      admin: val === 'admin',
      pending: val === 'pending'
    };
    db.collection('users')
      .doc(id)
      .update({ ...roles });
  };

  const renderUser = (user) => {
    return (
      <Table.Row key={user.uid}>
        <Table.TextCell>{user.name}</Table.TextCell>
        <Table.TextCell>{user.email}</Table.TextCell>
        <Table.TextCell>
          <Select
            width="100%"
            defaultValue={user.role}
            onChange={(e) => setRole(user.uid, e.currentTarget.value)}
          >
            <option value="admin">Administrator</option>
            <option value="coach">Coach</option>
            <option value="pending">Disabled</option>
          </Select>
        </Table.TextCell>
      </Table.Row>
    );
  };

  const filteredUsers = Object.keys(users).filter((id) => users[id].name.includes(searchQuery));

  const renderUsers = () => {
    const $users = filteredUsers.map((id) => renderUser(users[id]));
    return (
      <Table>
        <Table.Head>
          <Table.SearchHeaderCell onChange={doSearch} placeholder="Search names..." />
          <Table.TextHeaderCell>Email</Table.TextHeaderCell>
          <Table.TextHeaderCell>Account status</Table.TextHeaderCell>
        </Table.Head>
        <Table.Body height={240}>{$users}</Table.Body>
      </Table>
    );
  };

  if (!currentUser) {
    if (!currentUser.isAdmin) return <Redirect to="/" />;
  }

  if (isLoading) return <div className="page-container" />;

  const $content = Object.keys(users).length === 0 ? renderEmptyState() : renderUsers();
  return (
    <div className="page-container">
      <main>
        <h2>Manage users</h2>
        {$content}
      </main>
    </div>
  );
};

UserManagement.propTypes = {
  user: PropTypes.instanceOf(User)
};

export default UserManagement;
