import React, { useState } from 'react';
import { useStudentData } from './StudentProvider';
import ProjectCard from './ProjectCard';
import Project from '../models/Project';

import projectsData from '../projects.json';
import styles from '../assets/styles/projects.module.css';

const ProjectList = () => {
  const { students } = useStudentData();

  const $projects = Object.keys(projectsData).map((p) => {
    const project = new Project(projectsData[p]);
    // TODO: update order to id as the key
    return <ProjectCard key={p} students={students} project={project} />;
  });
  return (
    <div className={styles['projects-container']}>
      <ul className={styles['projects-list']}>{$projects}</ul>
    </div>
  );
};

export default ProjectList;
