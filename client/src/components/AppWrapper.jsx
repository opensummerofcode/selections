import { useAuth } from '@/services';

const AppWrapper = ({ children }) => {
  const { isLoading } = useAuth();

  if (isLoading) return <p />;
  return { children };
};

export default AppWrapper;
