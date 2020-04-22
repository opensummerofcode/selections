import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Student } from '../models';
import Filters from './Filters';
import StudentCard from './StudentCard';

import styles from '../assets/styles/dashboard.module.css';

const StudentList = ({ students }) => {
  const [filtered, setFiltered] = useState([]);

  const renderStudent = (student) => <StudentCard key={student.id} student={student} />;
  return (
    <div className={styles['student-list']}>
      <Filters students={students} setFiltered={setFiltered} />
      <ol>{students && filtered.map(renderStudent)}</ol>
    </div>
  );
};

StudentList.propTypes = {
  students: PropTypes.objectOf(PropTypes.instanceOf(Student))
};

export default StudentList;
