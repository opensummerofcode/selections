import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Pane, Badge, IconButton, Dialog } from 'evergreen-ui';
import { DropTarget } from 'react-dnd';
import ProjectModel from '../models/Project';

import styles from '../assets/styles/projects.module.css';

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
const drop = (props) => ({ ...props.project });

const ProjectCard = ({ students, project, isOverDropZone, connectDropTarget }) => {
  const [isAssigning, setIsAssigning] = useState(false);
  const [isAssignLoading, setIsAssignLoading] = useState(false);

  useEffect(() => {
    console.log(project.isBeingAssignedTo);
    if (project.isBeingAssignedTo) setIsAssigning(project.isBeingAssignedTo);
  }, [project.isBeingAssignedTo]);

  const stopAssigning = () => {
    project.isBeingAssignedTo = false;
  };

  const doAssign = () => {
    const student = project.isBeingAssignedTo;
  };

  const renderCoachesList = () => {
    if (project.coaches.length === 0)
      return <p className={styles['coach-disclaimer']}>No coaches yet</p>;
    return project.coaches
      .sort((a) => (a.isLead ? -1 : 1))
      .map((coach) => (
        <li key={coach.name}>
          <Badge color={coach.isLead ? 'purple' : 'neutral'}>{coach.name}</Badge>
        </li>
      ));
  };

  const renderRolesRequired = () => {
    const roles = project.requiredProfiles.reduce((all, profile) => {
      const role = Array.isArray(profile.role) ? profile.role.join('/') : profile.role;
      if (!all[role]) all[role] = profile;
      const count = all[role].count || 0;
      all[role] = {
        ...profile,
        role,
        count: count + 1
      };
      return all;
    }, {});

    return Object.keys(roles).map((key) => {
      const profile = roles[key];
      return (
        <li key={profile.role}>
          <Badge>
            {profile.count}x {profile.role}
          </Badge>
        </li>
      );
    });
  };

  const removeStudent = (studentId) => {
    project.unassign(studentId).then(() => {
      students[studentId].setAssignedStatus(false);
    });
  };

  const renderRole = (role) => (
    <li key={role}>
      <Badge>{role}</Badge>
    </li>
  );

  const renderStudent = (studentId) => {
    const student = students[studentId];
    const $roles = student.roles.map(renderRole);
    return (
      <article key={studentId} className={styles.students__student}>
        <div>
          <span>
            {student.firstName} {student.lastName}
          </span>
          <ul className={styles['roles-required']}>{$roles}</ul>
        </div>
        <IconButton
          icon="cross"
          intent="danger"
          height={24}
          onClick={() => removeStudent(studentId)}
        />
      </article>
    );
  };

  const $coaches = renderCoachesList();
  const $roles = renderRolesRequired();
  const $assignedStudents = project.assignedStudents.map(renderStudent);

  return connectDropTarget(
    <li className={`${styles.project} ${isOverDropZone ? styles.dropping : ''}`}>
      <Pane elevation={2} className={styles.wrapper}>
        <Dialog
          isShown={!!isAssigning}
          title={`Suggest "${isAssigning.firstName}" for ${project.name}`}
          intent="none"
          onCloseComplete={stopAssigning}
          confirmLabel="Make suggestion"
          onConfirm={doAssign}
          hasCancel={false}
          isConfirmLoading={isAssignLoading}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <p>
              A reason is not required, but will open up discussion and help us and your fellow
              coaches understand.
            </p>
          </form>
        </Dialog>
        <header className={styles.header}>
          <div>
            <h3 className={styles.title}>{project.name}</h3>
            <div className={styles.details}>
              <span className={styles.partner}>{project.partner}</span>
              <ul className={styles.coaches}>{$coaches}</ul>
              {project.template && (
                <a
                  href={project.template}
                  className={styles['template-link']}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  View template
                </a>
              )}
            </div>
          </div>
          <ul className={styles.roles}>{$roles}</ul>
        </header>
        <div className={styles.students}>{$assignedStudents}</div>
      </Pane>
    </li>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.instanceOf(ProjectModel).isRequired
};

export default DropTarget('student', { canDrop, drop }, collectDrag)(ProjectCard);
