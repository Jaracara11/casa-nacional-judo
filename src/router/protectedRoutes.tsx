import { Outlet } from 'react-router-dom';
import { UserAuth } from '../context/userContext';
import Auth from '../pages/auth/auth';

const ProtectedRoutes = () => {
  const { user } = UserAuth();

  return user ? <Outlet /> : <Auth />;
};

export default ProtectedRoutes;
