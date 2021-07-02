import { useAuth } from '@/services';
import Students from '@/components/Students';

export default function StudentDetail() {
  useAuth();

  return <Students />;
}
