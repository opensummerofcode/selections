import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
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

const StudentProvider = ({ children, history, match }) => {
  const [students, setStudents] = useState({});
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [suggestions, setSuggestions] = useState({});

  const selectedId = match.params.id;
  const selectStudent = (student) => {
    history.push(`/students/${student.id}/${student.firstName}-${student.lastName}`);
  };

  useEffect(() => {
    if (!students[selectedId]) return;
    setSelectedStudent(students[selectedId]);
  }, [students, selectedId]);

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
    selectedStudent,
    selectStudent,
    suggestions
  };

  return <StudentContext.Provider value={studentContext}>{children}</StudentContext.Provider>;
};

StudentProvider.propTypes = {
  children: PropTypes.node.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }),
  match: PropTypes.shape({
    params: PropTypes.shape({ id: PropTypes.string })
  })
};

export default withRouter(StudentProvider);
