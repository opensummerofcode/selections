import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Student } from '../models';
import StudentContext from '../context/students';

import rawStudents from '../students.json';
import suggestions from '../suggestions.json';

export const useStudentData = () => {
  const contextState = React.useContext(StudentContext);
  if (contextState === null) {
    throw new Error('useStudentData must be used within a StudentProvider tag');
  }
  return contextState;
};

const StudentProvider = ({ children, history }) => {
  // const [students, setStudents] = useState({});
  // const [suggestions, setSuggestions] = useState({});

  const selectStudent = (student) => {
    history.push(`/student/${student.id}/${student.firstName}-${student.lastName}`);
  };

  const students = Object.keys(rawStudents).reduce((all, s) => {
    all[s] = new Student(rawStudents[s]);
    return all;
  }, {});

  useEffect(() => {
    /*
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
    */
  }, []);

  useEffect(() => {
    /*
    return db.collection('suggestions').onSnapshot((snapshot) => {
      const data = snapshot.docChanges();
      const newSuggestions = data.reduce((all, s) => {
        all[s.doc.id] = s.doc.data();
        return all;
      }, {});
      setSuggestions((s) => ({ ...s, ...newSuggestions }));
    });
    */
  }, []);

  const studentContext = {
    students,
    selectStudent,
    suggestions
  };

  return <StudentContext.Provider value={studentContext}>{children}</StudentContext.Provider>;
};

StudentProvider.propTypes = {
  children: PropTypes.node.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  })
};

export default withRouter(StudentProvider);
