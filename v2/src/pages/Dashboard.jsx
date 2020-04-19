import React, { useState, useEffect } from 'react';
import tempData from './tempData';
import { db } from '../firebase';
import { Student } from '../models';

import StudentList from '../components/StudentList';
import StudentDetail from '../components/StudentDetail';
import Filters from '../components/Filters';

import styles from '../assets/styles/dashboard.module.css';

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [students, setStudents] = useState({});
  const [selectedStudent, selectStudent] = useState(null);

  /* useEffect(() => {
    const unsubscribe = db.collection('students').onSnapshot((snapshot) => {
      const data = snapshot.docChanges();
      const newStudents = {};
      data.forEach((change, i) => {
        const updated = change.doc.data();
        const student = new Student(updated);
        newStudents[student.id] = student;
      });
      setStudents(newStudents);
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);
  */

  useEffect(() => {
    setStudents(tempData);
  }, []);

  return (
    <main className={`page-container ${styles.dashboard}`}>
      <Filters />
      <div className={styles['content-wrapper']}>
        <StudentList students={students} />
        <StudentDetail selectedStudent={selectedStudent} />
      </div>
    </main>
  );
};

export default Dashboard;
