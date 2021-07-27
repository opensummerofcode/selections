import React, { useState } from 'react';
import { useStudents, useStudentList, useApplicantSubscription } from '@/hooks';
import Filters from './Filters';
import StudentCard from './StudentCard';

import styles from '../assets/styles/dashboard.module.css';

const StudentList = ({ showOnly }) => {
  useApplicantSubscription();
  const { applicants, isLoading: applicantsLoading } = useStudentList();
  const { students, isLoading } = useStudents();
  const [filtered, setFiltered] = useState([]);

  const renderStudent = (student) => <StudentCard key={student.id} student={student} />;
  return (
    <div className={styles['student-list']}>
      {!isLoading && (
        <>
          <Filters
            students={students}
            showOnly={showOnly}
            filteredCount={filtered.length}
            setFiltered={setFiltered}
          />
          <ol>{!isLoading && filtered.map(renderStudent)}</ol>
        </>
      )}
    </div>
  );
};

export default StudentList;
