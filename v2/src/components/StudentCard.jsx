import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Badge, Pane } from 'evergreen-ui';
import { Student } from '../models';
import StudentContext from '../context/students';

import styles from '../assets/styles/student-card.module.css';

const StudentCard = ({ student }) => {
  const { firstName, lastName } = student;
  const { selectedStudent, selectStudent, suggestions } = useContext(StudentContext);

  const isActive = selectedStudent && selectedStudent.id === student.id;

  const suggestionList = suggestions[student.id];
  const countSuggestionsOfType = (type) => {
    if (!suggestionList) return 0;
    return Object.keys(suggestionList).filter((person) => suggestionList[person].status === type)
      .length;
  };

  const suggestionAmounts = ['yes', 'maybe', 'no'].reduce(
    (all, status) => {
      const amount = countSuggestionsOfType(status);
      all[status] = amount;
      all.total += amount;
      return all;
    },
    { total: 0 }
  );

  return (
    <li className={styles.card}>
      <button onClick={() => selectStudent(student)} type="button" className="button--seamless">
        <Pane
          className={`${styles.wrapper} ${isActive ? styles.active : ''}`}
          elevation={isActive ? 2 : 1}
        >
          <div className={styles.name}>
            {firstName} {lastName}
            {student.isAlum && (
              <Badge color="green" marginLeft={8}>
                alum
              </Badge>
            )}
          </div>
          <div className={styles.suggestions}>
            {suggestionAmounts.total > 0 ? (
              <>
                <span
                  style={{ flex: suggestionAmounts.total / suggestionAmounts.yes }}
                  className={styles['suggestions-yes']}
                />
                <span
                  style={{ flex: suggestionAmounts.total / suggestionAmounts.maybe }}
                  className={styles['suggestions-maybe']}
                />
                <span
                  style={{ flex: suggestionAmounts.total / suggestionAmounts.no }}
                  className={styles['suggestions-no']}
                />
              </>
            ) : (
              <span className={styles['suggestions-empty']} />
            )}
          </div>
        </Pane>
      </button>
    </li>
  );
};

StudentCard.propTypes = {
  student: PropTypes.instanceOf(Student)
};

export default StudentCard;
