import React, { Routes, Route } from 'react-router-dom';
import ProtectedRoutes from './protectedRoutes';
import NotFound from '../pages/notFound/notFound';
import Home from '../pages/home/home';
import Auth from '../pages/auth/auth';

const Router = () => {
  return (
    <Routes>
      <Route path='*' element={<NotFound />} />
      <Route path='/' element={<Auth />} />
      <Route element={<ProtectedRoutes />}>
        <Route path='/home' element={<Home />} />
      </Route>
    </Routes>
  );
};

export default Router;
