import React from 'react';
import { Pane } from 'evergreen-ui';

const StudentDetail = ({ student }) => (
  <Pane elevation={2} className="student-detail--infos">
    <h2>
      {student.firstName} {student.lastName}
    </h2>
    <div>
      <h3>Why do you want to join Open Summer of Code? </h3>
      {student.motivation}
    </div>
    <div>
      <h3>Tell us why you think you&apos;ll make a good fit? </h3>
      {student.whyGoodFit}
    </div>
    <div>
      <h3>What skills can you best help your teammates with? </h3>
      {student.bestSkills}
    </div>
    <div>
      <h3>What would you like to learn or do better at Osoc? </h3>
      {student.learnOrDoBetter}
    </div>
    <div>
      <h3>For which role(s) do you want to apply? </h3>
      <ul>
        {student.roles.map(role => (
          <li key={role}>{role}</li>
        ))}
      </ul>
    </div>
    <div>
      <h3>
        Have you participated in Osoc before? If so, would you like to be a student manager
        this year?{' '}
      </h3>
      {student.prevParticipation}
    </div>
    <div>
      <h3>Links</h3>
      <ul>
        <li>
          <a target="_blank" rel="noopener noreferrer" href={student.CV}>
            CV
          </a>
        </li>
        <li>
          <a target="_blank" rel="noopener noreferrer" href={student.portfolio}>
            Portfolio
          </a>
        </li>
        { student.github && (
          <li>
            <a target="_blank" rel="noopener noreferrer" href={student.github}>
              GitHub
            </a>
          </li>
        )}
      </ul>
    </div>
  </Pane>
);

export default StudentDetail;
