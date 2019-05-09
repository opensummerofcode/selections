import React from 'react';
import PropTypes from 'prop-types';
import Student from '../models/Student';

const Students = ({ students }) => {
  const renderStudent = student => (
    <li>{student.firstName} {student.lastName}</li>
  );

  const $students = students.map(renderStudent);
  return (
    <ul className="students">
      {$students}
    </ul>
  );
};

Students.propTypes = {
  students: PropTypes.arrayOf(PropTypes.instanceOf(Student)).isRequired
};

export default Students;
