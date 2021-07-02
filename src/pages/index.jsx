import Students from '@/components/Students';
import StudentProvider from '@/components/StudentProvider';

const Index = () => (
  <StudentProvider>
    <Students />
  </StudentProvider>
);

export default Index;
