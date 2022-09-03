import { Outlet } from 'react-router-dom';
import { UserAuth } from '../context/userContext';
import Auth from '../pages/auth/auth';

export const ProtectedRoutes = () => {
  const { user } = UserAuth();

  return user ? <Outlet /> : <Auth />;
};
