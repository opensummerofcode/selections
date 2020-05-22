import React, { useState } from 'react';
import { useStudentData } from './StudentProvider';
import Filters from './Filters';
import StudentCard from './StudentCard';

import styles from '../assets/styles/dashboard.module.css';

const StudentList = () => {
  const [filtered, setFiltered] = useState([]);
  const { students } = useStudentData();

  const renderStudent = (student) => <StudentCard key={student.id} student={student} />;
  return (
    <div className={styles['student-list']}>
      <Filters students={students} filteredCount={filtered.length} setFiltered={setFiltered} />
      <ol>{students && filtered.map(renderStudent)}</ol>
    </div>
  );
};

export default StudentList;
