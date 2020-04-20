import React from 'react';
import PropTypes from 'prop-types';
import { Badge, Icon } from 'evergreen-ui';
import { Student } from '../models';

import twitterIcon from '../assets/img/icon-twitter.png';
import linkedinIcon from '../assets/img/icon-linkedin.png';
import githubIcon from '../assets/img/icon-github.png';
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

const ExternalLink = ({ href, children, ...rest }) => (
  <a href={href} {...rest} target="_blank" rel="noopener noreferrer">
    {children}
  </a>
);
ExternalLink.propTypes = {
  href: PropTypes.string.isRequired,
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
        </h2>
        <div className={styles.socials}>
          {student.twitter && (
            <ExternalLink href={student.twitter}>
              <div className={styles['icon-container']}>
                <img src={twitterIcon} alt="Twitter" />
              </div>
            </ExternalLink>
          )}
          {student.github && (
            <ExternalLink href={student.github}>
              <div className={styles['icon-container']}>
                <img src={githubIcon} alt="GitHub" />
              </div>
            </ExternalLink>
          )}
          {student.linkedin && (
            <ExternalLink href={student.linkedin}>
              <div className={styles['icon-container']}>
                <img src={linkedinIcon} alt="LinkedIn" />
              </div>
            </ExternalLink>
          )}
        </div>
        {student.isAlum && (
          <Badge color="green" marginLeft={16}>
            alum
          </Badge>
        )}
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
            <ExternalLink href={student.cv}>CV</ExternalLink>
          </li>
          {student.portfolio && (
            <li>
              <ExternalLink href={student.portfolio}>Portfolio</ExternalLink>
            </li>
          )}
        </ul>
        <h4>Project you&apos;re most proud of:</h4>
        <p className={styles.newlines}>{student.mostProud}</p>
        {student.isAlum && (
          <ul className={styles['true-false']}>
            <li>
              {renderStatusIcon(student.wantsToCoach)}
              {student.firstName} {student.wantsToCoach ? 'wants to be' : 'does not want to be'} a
              student coach
            </li>
          </ul>
        )}
      </section>

      <section>
        <h3>Practical</h3>
        <p>The student can work:</p>
        <ul className={styles['true-false']}>
          <li>
            {renderStatusIcon(student.canWorkUnderEmploymentAgreement)}under a Belgian employment
            agreement
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
