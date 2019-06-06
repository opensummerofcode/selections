import React from 'react';
import PropTypes from 'prop-types';
import { Pane } from 'evergreen-ui';
import { DragSource } from 'react-dnd';
import Student from '../models/Student';

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
});

const beginDrag = props => ({ ...props });

const endDrag = (props, monitor) => {
  if (!monitor.didDrop()) return;

  const { student } = monitor.getItem();
  const project = monitor.getDropResult();
  project.assign(student);
};

const StudentCard = ({
  student, countSuggestionsOfType, selectStudent, connectDragSource
}) => connectDragSource(
  <li className={`status--${student.status}`}>
    <button type="button" className="button--seamless" onClick={() => selectStudent(student)}>
      <Pane className="students__student" elevation={1}>
        <div className="students__student__name">
          <span>{student.firstName} {student.lastName}</span>
          {student.confirmed && <span className="confirmed">Email sent</span>}
        </div>
        <div className="students__student__statuses">
          <span>Yes: {countSuggestionsOfType(student.id, 'yes')}</span>
          <span>Maybe: {countSuggestionsOfType(student.id, 'maybe')}</span>
          <span>No: {countSuggestionsOfType(student.id, 'no')}</span>
        </div>
      </Pane>
    </button>
  </li>
);

StudentCard.propTypes = {
  student: PropTypes.instanceOf(Student),
  isDragging: PropTypes.bool.isRequired,
  connectDragSource: PropTypes.func.isRequired
};

export default DragSource('student', { beginDrag, endDrag }, collect)(StudentCard);
