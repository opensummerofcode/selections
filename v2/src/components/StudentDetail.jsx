import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Student } from '../models';

import dashStyles from '../assets/styles/dashboard.module.css';
import styles from '../assets/styles/student-detail.module.css';

const StudentDetail = ({ selectedStudent }) => {
  const Wrapper = ({ children }) => (
    <section className={dashStyles['student-detail']}>{children}</section>
  );

  if (!selectedStudent) {
    return (
      <Wrapper>
        <h2 className={styles.empty}>Select a student from the side bar to get started</h2>
      </Wrapper>
    );
  }

  const { firstName, lastName } = selectedStudent;
  return (
    <Wrapper>
      <h2 className={styles.name}>
        {firstName} {lastName}
      </h2>
    </Wrapper>
  );
};

StudentDetail.propTypes = {
  selectedStudent: PropTypes.instanceOf(Student)
};

export default StudentDetail;
