import React from 'react';
import PropTypes from 'prop-types';
import { Badge, Icon } from 'evergreen-ui';
import { Student } from '../models';

import dashStyles from '../assets/styles/dashboard.module.css';
import styles from '../assets/styles/student-detail.module.css';

const Wrapper = ({ children }) => (
  <section className={`${dashStyles['student-detail']} ${styles['student-detail']}`}>
    {children}
  </section>
);

Wrapper.propTypes = {
  children: PropTypes.node.isRequired
};

const StudentDetail = ({ selectedStudent: student }) => {
  if (!student) {
    return (
      <Wrapper>
        <h2 className={styles.empty}>Select a student from the sidebar to get started</h2>
      </Wrapper>
    );
  }

  const renderStatusIcon = (condition) => (
    <i className={styles.icon} aria-label={`${condition ? 'positive' : 'negative'}`}>
      {condition ? <Icon icon="tick" color="success" /> : <Icon icon="cross" color="danger" />}
    </i>
  );

  const { firstName, lastName } = student;
  return (
    <Wrapper>
      <header>
        <h2 className={styles.name}>
          {firstName} {lastName}{' '}
          {student.isAlum && (
            <Badge color="green" marginLeft={8}>
              alum
            </Badge>
          )}
        </h2>
      </header>

      <section>
        <h3>Academia</h3>
        <ul>
          <li>
            Enrolled at <strong>{student.school}</strong>
          </li>
          <li>
            Studies: <strong>{student.fieldOfStudy.join(', ')}</strong>
          </li>
          <li>
            Type of degree: <strong>{student.typeOfDegree}</strong>
          </li>
          <li>
            Year into degree: <strong>{student.yearIntoDegree}</strong>
          </li>
        </ul>
      </section>

      <section>
        <h3>Experience</h3>
        <ul>
          <li>
            <a href={student.cv} rel="noopener noreferrer" target="_blank">
              CV
            </a>
          </li>
          {student.portfolio && (
            <li>
              <a href={student.portfolio} rel="noopener noreferrer">
                Portfolio
              </a>
            </li>
          )}
        </ul>
        <h4>Project you&apos;re most proud of:</h4>
        <p className={styles.newlines}>{student.mostProud}</p>
      </section>

      <section>
        <h3>Practical</h3>
        <p>The student can work:</p>
        <ul className={styles['true-false']}>
          <li>
            {renderStatusIcon(student.canWorkUnderEmploymentAgreement)}under a Belgian Employment
            Agreement
          </li>
          <li>
            {renderStatusIcon(student.canWorkDuringHours)}
            during the month of July, Monday through Thursday
          </li>
          <li>
            {renderStatusIcon(student.hasLaptop)}
            on their own laptop
          </li>
        </ul>
      </section>

      <section>
        <h3>Motivation</h3>
        <h4>Why do you want to participate in osoc?</h4>
        <p className={styles.newlines}>{student.whyOsoc}</p>

        <h4>Why do you think you&apos;re a good fit</h4>
        <p className={styles.newlines}>{student.whyGoodFit}</p>

        <h4>What are the things you want to learn at osoc?</h4>
        <p className={styles.newlines}>{student.whatToLearn}</p>

        <h4>What skills can you best help your teammates with?</h4>
        <p className={styles.newlines}>{student.whatSkills}</p>

        {student.anythingElse && (
          <>
            <h4>Is there anything else you&apos;d like to share?</h4>
            <p className={styles.newlines}>{student.anythingElse}</p>
          </>
        )}
      </section>
    </Wrapper>
  );
};

StudentDetail.propTypes = {
  selectedStudent: PropTypes.instanceOf(Student)
};

export default StudentDetail;
