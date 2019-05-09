import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Pane } from 'evergreen-ui';
import Student from '../models/Student';

const Students = ({ students }) => {
  const [selectedStudent, selectStudent] = useState(null);

  const renderStudent = student => (
    <li key={student.id}>
      <button type="button" className="button--seamless" onClick={() => selectStudent(student)}>
        <Pane className="students__student" elevation={1}>
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
      <ol className="students">
        {$students}
      </ol>
      <main className="student-detail">
        Select a student from the list to display their information.
      </main>
    </div>

  );
};

Students.propTypes = {
  students: PropTypes.arrayOf(PropTypes.instanceOf(Student)).isRequired
};

export default Students;
