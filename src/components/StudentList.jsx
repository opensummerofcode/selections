import React, { useState } from 'react';
import { useStudents } from '@/services';
import Filters from './Filters';
import StudentCard from './StudentCard';

import styles from '../assets/styles/dashboard.module.css';

const StudentList = ({ showOnly }) => {
  const { students } = useStudents();
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

export default StudentList;
