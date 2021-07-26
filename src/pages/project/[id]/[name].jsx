import ProjectDetail from '@/components/ProjectDetail';
import SidebarLayout from '@/components/SidebarLayout';

function Project() {
  return <ProjectDetail />;
}

Project.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default Project;
