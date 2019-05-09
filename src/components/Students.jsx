import React from 'react';
import PropTypes from 'prop-types';
import Student from '../models/Student';

const Students = ({ students }) => {
  return (
    <div>
      Students
    </div>
  );
};

Students.propTypes = {
  students: PropTypes.arrayOf(PropTypes.instanceOf(Student)).isRequired
};

export default Students;
