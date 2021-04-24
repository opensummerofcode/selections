import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { db } from '../firebase';
import { Student } from '../models';
import StudentContext from '../context/students';

export const useStudentData = () => {
  const contextState = React.useContext(StudentContext);
  if (contextState === null) {
    throw new Error('useStudentData must be used within a StudentProvider tag');
  }
  return contextState;
};

const StudentProvider = ({ children }) => {
  const [students, setStudents] = useState(null);
  const [suggestions, setSuggestions] = useState({});

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
    students,
    suggestions
  };

  return (
    <StudentContext.Provider value={studentContext}>{students && children}</StudentContext.Provider>
  );
};

StudentProvider.propTypes = {
  children: PropTypes.node.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  })
};

export default StudentProvider;
