import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import StudentProvider from '@/components/StudentProvider';
import StudentList from '@/components/StudentList';
import ProjectList from '@/components/ProjectList';

import styles from '../assets/styles/dashboard.module.css';

const Projects = () => (
  <StudentProvider>
    <DndProvider backend={HTML5Backend}>
      <main className={`page-container ${styles.dashboard}`}>
        <div className={styles['content-wrapper']}>
          <StudentList showOnly={['yes', 'maybe']} />
          <ProjectList />
        </div>
      </main>
    </DndProvider>
  </StudentProvider>
);

export default Projects;
