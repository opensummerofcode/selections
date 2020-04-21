import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Student } from '../models';
import { removeDiacritics } from '../util';
import Filters from './Filters';
import StudentCard from './StudentCard';

import styles from '../assets/styles/dashboard.module.css';

const StudentList = ({ students }) => {
  const [filters, setFilters] = useState({});

  const lowerAndParseStr = (str) => removeDiacritics(str.toLowerCase());

  const filterBySearchQuery = (student) => {
    const query = lowerAndParseStr(filters.searchQuery);
    const firstName = lowerAndParseStr(student.firstName);
    const lastName = lowerAndParseStr(student.lastName);
    return (
      firstName.includes(query) ||
      lastName.includes(query) ||
      `${firstName} ${lastName}`.includes(query) ||
      `${lastName} ${firstName}`.includes(query)
    );
  };

  const sortByFirstNameThenLastName = (a, b) => {
    const firstNameP1 = lowerAndParseStr(a.firstName);
    const firstNameP2 = lowerAndParseStr(b.firstName);
    const lastNameP1 = lowerAndParseStr(a.lastName);
    const lastNameP2 = lowerAndParseStr(b.lastName);
    if (firstNameP1 < firstNameP2) return -1;
    if (firstNameP1 > firstNameP2) return 1;
    if (lastNameP1 < lastNameP2) return -1;
    if (lastNameP1 > lastNameP2) return 1;
    return 0;
  };

  const renderStudent = (student) => <StudentCard key={student.id} student={student} />;
  return (
    <div className={styles['student-list']}>
      <Filters setFilters={setFilters} />
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
