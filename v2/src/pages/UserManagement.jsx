import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Table, Select } from 'evergreen-ui';
import { User } from '../models';
import { db } from '../firebase';
import { sortByRole } from '../util';

import styles from '../assets/styles/user-management.module.css';

const UserManagement = ({ user: currentUser }) => {
  const [users, setUsers] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const unsubscribe = db.collection('users').onSnapshot((snapshot) => {
      const data = snapshot.docChanges();
      const newUsers = {};
      data.forEach((change) => {
        const updated = change.doc.data();
        if (currentUser.id !== updated.uid) {
          newUsers[data.uid] = new User(updated);
        }
      });
      setUsers(newUsers);
    });
    return unsubscribe;
  }, [currentUser.id]);

  const doSearch = (value) => setSearchQuery(value);

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
  const filteredUsers = Object.keys(users)
    .filter((id) => users[id].name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((id1, id2) => sortByRole(users[id1], users[id2]));

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

  const $content = renderUsers();
  return (
    <div className="page-container">
      <main className={styles.module}>
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
