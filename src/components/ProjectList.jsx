import React, { useState } from 'react';
import { useStudentData } from './StudentProvider';

import styles from '../assets/styles/projects.module.css';

const StudentList = () => {
  const { students } = useStudentData();

  return <div className={styles['projects-container']}>hi</div>;
};

export default StudentList;
