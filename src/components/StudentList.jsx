import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { SearchInput } from 'evergreen-ui';
import { Student } from '../models';
import StudentCard from './StudentCard';

import styles from '../assets/styles/dashboard.module.css';

const StudentList = ({ students }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const renderStudent = (student) => <StudentCard key={student.id} student={student} />;

  const filterBySearchQuery = (student) => {
    const query = searchQuery.toLowerCase();
    const firstName = student.firstName.toLowerCase();
    const lastName = student.lastName.toLowerCase();
    return (
      firstName.includes(query) ||
      lastName.includes(query) ||
      `${firstName} ${lastName}`.includes(query) ||
      `${lastName} ${firstName}`.includes(query)
    );
  };

  const sortByFirstNameThenLastName = (a, b) => {
    if (a.firstName < b.firstName) return -1;
    if (a.firstName > b.firstName) return 1;
    if (a.lastName < b.lastName) return -1;
    if (a.lastName > b.lastName) return 1;
    return 0;
  };

  return (
    <div className={styles['student-list']}>
      <header>
        <SearchInput
          placeholder="Search students by name..."
          width="100%"
          onChange={(e) => setSearchQuery(e.target.value)}
          value={searchQuery}
        />
      </header>
      <ol>
        {students &&
          Object.keys(students)
            .map((id) => students[id])
            .filter(filterBySearchQuery)
            .sort(sortByFirstNameThenLastName)
            .map(renderStudent)}
      </ol>
    </div>
  );
};

StudentList.propTypes = {
  students: PropTypes.objectOf(PropTypes.instanceOf(Student))
};

export default StudentList;
