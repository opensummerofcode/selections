import { useAuth } from '@/hooks';
import Students from '@/components/Students';
import StudentProvider from '@/components/StudentProvider';

export default function Index() {
  useAuth({});

  return (
    <StudentProvider>
      <Students />
    </StudentProvider>
  );
}
