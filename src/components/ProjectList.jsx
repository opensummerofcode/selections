import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { useStudentData } from './StudentProvider';
import ProjectCard from './ProjectCard';
import Project from '../models/Project';

import styles from '../assets/styles/projects.module.css';
import { sortAlphabetically } from '../util';

const ProjectList = () => {
  const [projects, setProjects] = useState({});
  const { students } = useStudentData();

  useEffect(() => {
    const unsubscribe = db.collection('projects').onSnapshot((snapshot) => {
      const data = snapshot.docChanges();
      const newProjects = {};
      data.forEach((change) => {
        const updated = change.doc.data();
        const project = new Project(updated, change.doc.id);
        newProjects[project.id] = project;
      });
      setProjects((p) => ({ ...p, ...newProjects }));
    });
    return unsubscribe;
  }, []);

  const $projects = Object.keys(projects)
    .sort((p1, p2) => sortAlphabetically(projects[p1].name, projects[p2].name))
    .map((key) => {
      return <ProjectCard key={key} students={students} project={projects[key]} />;
    });
  return (
    <div className={styles['projects-container']}>
      <ul className={styles['projects-list']}>{$projects}</ul>
    </div>
  );
};

export default ProjectList;
