import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { useStudentData } from './StudentProvider';
import ProjectCard from './ProjectCard';
import Project from '../models/Project';

import styles from '../assets/styles/projects.module.css';

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

  const $projects = Object.keys(projects).map((key) => {
    return <ProjectCard key={key} students={students} project={projects[key]} />;
  });
  return (
    <div className={styles['projects-container']}>
      <ul className={styles['projects-list']}>{$projects}</ul>
    </div>
  );
};

export default ProjectList;
