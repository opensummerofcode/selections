import React from 'react';
import PropTypes from 'prop-types';
import { Pane, Badge, IconButton } from 'evergreen-ui';
import { DropTarget } from 'react-dnd';
import ProjectModel from '../models/Project';

const collectDrag = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOverDropZone: monitor.isOver(),
  isOverCurrent: monitor.isOver({ shallow: true }),
  canDrop: monitor.canDrop(),
  itemType: monitor.getItemType()
});

/* const canDrop = (props, monitor) => {
  const student = monitor.getItem();
  return true;
};

const drop = (props, monitor, component) => {
  // if (monitor.didDrop()) return;
  return { ...props.project };
}; */

const canDrop = () => true;
const drop = props => ({ ...props.project });

const Project = ({
  students, project, isOverDropZone, connectDropTarget
}) => {
  const renderCoachesList = () => {
    if (project.coaches.length === 0) return <p className="project__coach-disclaimer">No coaches yet</p>;
    return (
      project.coaches
        .sort(a => (a.type === 'Lead' ? -1 : 1))
        .map(coach => (
          <li key={coach.name}>
            <Badge color={coach.type === 'Lead' ? 'blue' : 'neutral'}>{coach.name}</Badge>
          </li>
        ))
    );
  };

  const removeStudent = (studentId) => {
    project.unassign(studentId).then(() => {
      students[studentId].setAssignedStatus(false);
    });
  };

  const renderRole = role => (
    <li key={role}>
      <Badge>{role}</Badge>
    </li>
  );

  const renderStudent = (studentId) => {
    const student = students[studentId];
    const $roles = student.roles.map(renderRole);
    return (
      <article key={studentId} className="project__students__student">
        <div>
          <span>{student.firstName} {student.lastName}</span>
          <ul>{$roles}</ul>
        </div>
        <IconButton icon="cross" intent="danger" height={24} onClick={() => removeStudent(studentId)} />
      </article>
    );
  };

  const $coaches = renderCoachesList();
  const $assignedStudents = project.assignedStudents.map(renderStudent);

  return connectDropTarget(
    <div key={project.id}>
      <Pane className={`project ${isOverDropZone ? 'dropping' : ''}`} elevation={2}>
        <header className="project__header">
          <h3 className="project__title">{project.name}</h3>
          <div className="project__details">
            <span className="project__partner">{project.partner}</span>
            <ul className="project__coaches">
              {$coaches}
            </ul>
            {project.template && <a href={project.template} className="project__template-link" rel="noopener noreferrer" target="_blank">View template</a>}
          </div>
        </header>
        <div className="project__students">
          {$assignedStudents}
        </div>
      </Pane>
    </div>
  );
};

Project.propTypes = {
  project: PropTypes.instanceOf(ProjectModel).isRequired
};

export default DropTarget('student', { canDrop, drop }, collectDrag)(Project);
