import React from 'react';
import PropTypes from 'prop-types';
import { Student } from '../models';

import styles from '../assets/styles/student-card.module.css';

const StudentCard = ({ student }) => {
  const { firstName, lastName } = student;
  return (
    <li className={styles.card}>
      <button type="button" className="button--seamless">
        <div className={styles.wrapper}>
          <div className={styles.name}>
            {firstName} {lastName}
          </div>
          <div className={styles.suggestions}></div>
        </div>
      </button>
    </li>
  );
};

StudentCard.propTypes = {
  student: PropTypes.instanceOf(Student)
};

export default StudentCard;
