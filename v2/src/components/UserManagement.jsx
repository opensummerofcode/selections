import React, { useState, useEffect } from 'react';
import { db } from '../firebase';

const UserManagement = () => {
  const [users, setUsers] = useState({});

  useEffect(() => {
    const unsubscribe = db.collection('users').onSnapshot((snapshot) => {
      const newUsers = {};
      snapshot.forEach((doc) => {
        const data = doc.data();
        newUsers[data.uid] = data;
      });
      setUsers(newUsers);
    });
    return unsubscribe;
  }, []);

  return <p>Hi</p>;
};

export default UserManagement;
