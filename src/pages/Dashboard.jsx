import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { db } from '../firebase';
import { Student } from '../models';
import StudentContext from '../context/students';

import StudentList from '../components/StudentList';
import StudentDetail from '../components/StudentDetail';

import styles from '../assets/styles/dashboard.module.css';

const Dashboard = ({ history, match }) => {
  const [students, setStudents] = useState({});
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [suggestions, setSuggestions] = useState({});

  const selectedId = match.params.id;
  useEffect(() => {
    if (!students[selectedId]) return;
    setSelectedStudent(students[selectedId]);
  }, [students, selectedId]);

  const selectStudent = (student) => {
    history.push(`/student/${student.id}/${student.firstName}-${student.lastName}`);
  };

  useEffect(() => {
    const unsubscribe = db.collection('students').onSnapshot((snapshot) => {
      const data = snapshot.docChanges();
      const newStudents = {};
      data.forEach((change) => {
        const updated = change.doc.data();
        const student = new Student(updated);
        newStudents[student.id] = student;
      });
      setStudents((s) => ({ ...s, ...newStudents }));
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    return db.collection('suggestions').onSnapshot((snapshot) => {
      const data = snapshot.docChanges();
      const newSuggestions = data.reduce((all, s) => {
        all[s.doc.id] = s.doc.data();
        return all;
      }, {});
      setSuggestions((s) => ({ ...s, ...newSuggestions }));
    });
  }, []);

  const studentContext = {
    selectedStudent,
    selectStudent,
    suggestions
  };

  return (
    <main className={`page-container ${styles.dashboard}`}>
      <StudentContext.Provider value={studentContext}>
        <div className={styles['content-wrapper']}>
          <StudentList students={students} />
          <StudentDetail selectedStudent={selectedStudent} />
        </div>
      </StudentContext.Provider>
    </main>
  );
};

Dashboard.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }),
  match: PropTypes.shape({
    params: PropTypes.shape({ id: PropTypes.string })
  })
};

export default withRouter(Dashboard);
