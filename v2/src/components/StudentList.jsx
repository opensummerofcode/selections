import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Student } from '../models';
import StudentCard from './StudentCard';

import styles from '../assets/styles/dashboard.module.css';

const StudentList = ({ students }) => {
  const renderStudent = (student) => <StudentCard key={student.id} student={student} />;

  const sortByFirstNameThenLastName = (a, b) => {
    if (a.firstName < b.firstName) return -1;
    if (a.firstName > b.firstName) return 1;
    if (a.lastName < b.lastName) return -1;
    if (a.lastName > b.lastName) return 1;
    return 0;
  };

  const $students = Object.keys(students)
    .map((id) => students[id])
    .sort(sortByFirstNameThenLastName)
    .map(renderStudent);

  return <ol className={styles['student-list']}>{$students}</ol>;
};

StudentList.propTypes = {
  students: PropTypes.objectOf(PropTypes.instanceOf(Student))
};

export default StudentList;
