import React from 'react';
import StudentProvider from '../components/StudentProvider';
import StudentList from '../components/StudentList';
import StudentDetail from '../components/StudentDetail';

import styles from '../assets/styles/dashboard.module.css';

const Students = () => (
  <StudentProvider>
    <main className={`page-container ${styles.dashboard}`}>
      <div className={styles['content-wrapper']}>
        <StudentList />
        <StudentDetail />
      </div>
    </main>
  </StudentProvider>
);

export default Students;
