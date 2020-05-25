import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Pane, Badge, IconButton, Dialog, Tooltip, Icon, Position, toaster } from 'evergreen-ui';
import { DropTarget } from 'react-dnd';
import { sortAlphabetically } from '../util';
import ProjectModel from '../models/Project';

import styles from '../assets/styles/projects.module.css';

const collectDrag = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOverDropZone: monitor.isOver(),
  isOverCurrent: monitor.isOver({ shallow: true }),
  canDrop: monitor.canDrop(),
  itemType: monitor.getItemType()
});

const ConditionalTooltip = ({ condition, content, children }) =>
  condition ? (
    <Tooltip content={content} position={Position.TOP}>
      {children}
    </Tooltip>
  ) : (
    children
  );

ConditionalTooltip.propTypes = {
  condition: PropTypes.bool.isRequired,
  content: PropTypes.node,
  children: PropTypes.node.isRequired
};

const canDrop = () => true;
const drop = (props) => ({ ...props.project });

const ProjectCard = ({ students, project, isOverDropZone, connectDropTarget }) => {
  const [studentBeingAssigned, setAssignedStudent] = useState(false);
  const [isAssignLoading, setIsAssignLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);

  useEffect(() => {
    if (project.isBeingAssignedTo && project.hasStudent(project.isBeingAssignedTo)) {
      toaster.danger(`${project.isBeingAssignedTo.firstName} is already on ${project.name}`);
    } else setAssignedStudent(project.isBeingAssignedTo);
  }, [project, project.isBeingAssignedTo]);

  const stopAssigning = () => {
    project.stopAssigning();
    setAssignedStudent(null);
  };

  const doAssign = async () => {
    setIsAssignLoading(true);
    await project.assign(studentBeingAssigned, selectedRole);
    setIsAssignLoading(false);
    project.stopAssigning();
  };

  const renderCoachesList = () => {
    if (project.coaches.length === 0)
      return <p className={styles['coach-disclaimer']}>No coaches yet</p>;
    return project.coaches
      .sort((a, b) => {
        if (a.isLead) return -1;
        if (b.isLead) return 1;
        return sortAlphabetically(a, b);
      })
      .map((coach) => (
        <li key={coach.name}>
          <Badge color={coach.isLead ? 'purple' : 'neutral'}>{coach.name}</Badge>
        </li>
      ));
  };

  const renderRolesRequired = () =>
    project.requiredProfiles.map((profile) => (
      <li key={profile.role}>
        <ConditionalTooltip
          condition={!!profile.comment}
          content={profile.comment}
          position={Position.TOP}
        >
          <Badge className={styles.badge}>
            {profile.comment && <Icon color="info" marginRight={4} size={12} icon="info-sign" />}
            {profile.amount || 1}x {profile.role}
          </Badge>
        </ConditionalTooltip>
      </li>
    ));

  const renderRoleSelectors = () =>
    project.requiredProfiles.map((profile) => (
      <ConditionalTooltip
        condition={!!profile.comment}
        content={profile.comment}
        position={Position.TOP}
        key={profile.role}
      >
        <Badge
          className={styles.badge}
          color={selectedRole === profile.role ? 'purple' : 'neutral'}
          isInteractive
          onClick={() => setSelectedRole(profile.role)}
          marginRight={8}
        >
          {profile.comment && <Icon color="info" marginRight={4} size={16} icon="info-sign" />}
          {profile.role}
        </Badge>
      </ConditionalTooltip>
    ));

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
  const $roleSelectors = renderRoleSelectors();
  const $assignedStudents = project.assignedStudents.map(renderStudent);

  return connectDropTarget(
    <li className={`${styles.project} ${isOverDropZone ? styles.dropping : ''}`}>
      <Pane elevation={2} className={styles.wrapper}>
        <Dialog
          isShown={!!studentBeingAssigned}
          title={
            studentBeingAssigned
              ? `Draft ${studentBeingAssigned.firstName} for ${project.name}`
              : 'Draft student'
          }
          intent="none"
          onCloseComplete={stopAssigning}
          confirmLabel={selectedRole ? `Draft as ${selectedRole}` : 'Draft'}
          onConfirm={doAssign}
          hasCancel
          isConfirmLoading={isAssignLoading}
          isConfirmDisabled={!selectedRole}
        >
          <h3 className={styles.title}>
            Which role are you drafting {studentBeingAssigned && studentBeingAssigned.firstName}{' '}
            for?
          </h3>
          <div className={styles['role-selector']}>{$roleSelectors}</div>
          <p className={styles['role-selector-disclaimer']}>
            You can still remove this student from the team later.
          </p>
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
