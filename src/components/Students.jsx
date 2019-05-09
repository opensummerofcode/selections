import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Pane } from 'evergreen-ui';
import Student from '../models/Student';

const Students = ({ students }) => {
  const [selectedStudent, selectStudent] = useState(null);

  const renderStudent = student => (
    <li key={student.id}>
      <button type="button" className="button--seamless" onClick={() => selectStudent(student)}>
        <Pane className="students__student" elevation={2}>
          {student.firstName} {student.lastName}
        </Pane>
      </button>
    </li>
  );

  const $students = students
    .sort((a, b) => {
      if (a.firstName < b.firstName) return -1;
      if (a.firstName > b.firstName) return 1;
      return 0;
    })
    .map(renderStudent);

  return (
    <div className="container">
      <ol className="students">{$students}</ol>
      <main className="student-detail">
        {console.log(selectedStudent)}
        {!selectedStudent && 'Select a student from the list to display their information.'}
        {selectedStudent && (
          <Pane elevation={2} className="student-detail--infos">
            <div>
              <h3>Why do you want to join Open Summer of Code? </h3>
              {selectedStudent.motivation}
            </div>
            <div>
              <h3>Tell us why you think you&apos;ll make a good fit? </h3>
              {selectedStudent.whyGoodFit}
            </div>
            <div>
              <h3>What skills can you best help your teammates with? </h3>
              {selectedStudent.bestSkills}
            </div>
            <div>
              <h3>What would you like to learn or do better at Osoc? </h3>
              {selectedStudent.learnOrDoBetter}
            </div>
            <div>
              <h3>Links</h3>
              <ul>
                <li>
                  <a href={selectedStudent.CV}>CV</a>
                </li>
                <li>
                  <a href={selectedStudent.portfolio}>Portfolio</a>
                </li>
              </ul>
            </div>
          </Pane>
        )}
      </main>
    </div>
  );
};

Students.propTypes = {
  students: PropTypes.arrayOf(PropTypes.instanceOf(Student)).isRequired
};

export default Students;
