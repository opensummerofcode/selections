import React from 'react';
import StudentList from '../components/StudentList';
import StudentDetail from '../components/StudentDetail';

import styles from '../assets/styles/dashboard.module.css';

const Students = () => (
  <main className={`page-container ${styles.dashboard}`}>
    <div className={styles['content-wrapper']}>
      <StudentList />
      <StudentDetail />
    </div>
  </main>
);

export default Students;
