import { useAuth } from '@/services';
import Students from '@/components/Students';

export default function Index() {
  useAuth();

  return <Students />;
}
