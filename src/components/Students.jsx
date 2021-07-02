import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import StudentList from './StudentList';
import StudentDetail from './StudentDetail';

import styles from '../assets/styles/dashboard.module.css';

const Students = () => (
  <DndProvider backend={HTML5Backend}>
    <main className={`page-container ${styles.dashboard}`}>
      <div className={styles['content-wrapper']}>
        <StudentList />
        <StudentDetail />
      </div>
    </main>
  </DndProvider>
);

export default Students;
