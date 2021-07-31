import { useRequireAuth } from '@/hooks';
import StudentDetail from '@/components/StudentDetail';
import SidebarLayout from '@/components/SidebarLayout';

function Index() {
  // const user = useRequireAuth();

  // if (!user) return <p />;
  return <StudentDetail />;
}

Index.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default Index;
