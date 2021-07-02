import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useStudents } from '@/services';
import Filters from './Filters';
import StudentCard from './StudentCard';

import styles from '../assets/styles/dashboard.module.css';

const StudentList = ({ showOnly }) => {
  const [filtered, setFiltered] = useState([]);

  const renderStudent = (student) => <StudentCard key={student.id} student={student} />;
  return (
    <div className={styles['student-list']}>
      <Filters
        students={students}
        showOnly={showOnly}
        filteredCount={filtered.length}
        setFiltered={setFiltered}
      />
      <ol>{students && filtered.map(renderStudent)}</ol>
    </div>
  );
};

StudentList.propTypes = {
  showOnly: PropTypes.arrayOf(PropTypes.oneOf(['yes', 'maybe', 'no', 'no-status']))
};

export default StudentList;
