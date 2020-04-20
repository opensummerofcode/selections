import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Badge } from 'evergreen-ui';
import { Student } from '../models';
import StudentContext from '../context/students';

import styles from '../assets/styles/student-card.module.css';

const StudentCard = ({ student }) => {
  const { firstName, lastName } = student;
  const { selectedStudent, selectStudent } = useContext(StudentContext);

  const isActive = selectedStudent && selectedStudent.id === student.id;
  return (
    <li className={`${styles.card} ${isActive ? 'active' : ''}`}>
      <button onClick={() => selectStudent(student)} type="button" className="button--seamless">
        <div className={styles.wrapper}>
          <div className={styles.name}>
            {firstName} {lastName}
            {student.isAlum && (
              <Badge color="green" marginLeft={8}>
                alum
              </Badge>
            )}
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
