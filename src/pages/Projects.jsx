import React from 'react';
import StudentProvider from '../components/StudentProvider';
import StudentList from '../components/StudentList';
import ProjectList from '../components/ProjectList';

import styles from '../assets/styles/dashboard.module.css';

const Projects = () => (
  <StudentProvider>
    <main className={`page-container ${styles.dashboard}`}>
      <div className={styles['content-wrapper']}>
        <StudentList />
        <ProjectList />
      </div>
    </main>
  </StudentProvider>
);

export default Projects;
