import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import StudentList from '@/components/StudentList';
import ProjectList from '@/components/ProjectList';

import styles from '../assets/styles/dashboard.module.css';

export default function Projects() {
  return (
    <DndProvider backend={HTML5Backend}>
      <main className={`page-container ${styles.dashboard}`}>
        <div className={styles['content-wrapper']}>
          <StudentList showOnly={['yes', 'maybe']} />
          <ProjectList />
        </div>
      </main>
    </DndProvider>
  );
}
