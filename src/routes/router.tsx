import React, { Routes, Route } from 'react-router-dom';
import { ProtectedRoutes } from './protectedRoutes';
import { NotFound } from '../pages/notFound/notFound';
import { Home } from '../pages/home/home';
import { Auth } from '../pages/auth/auth';
import { UpsertMember } from '../pages/upsertMember/upsertMember';

export const Router = () => {
  return (
    <Routes>
      <Route path='*' element={<NotFound />} />
      <Route path='/auth' element={<Auth />} />
      <Route element={<ProtectedRoutes />}>
        <Route path='/' element={<Home />} />
        <Route path='/add-member' element={<UpsertMember />} />
        <Route path='/edit-member/:id' element={<UpsertMember />} />
      </Route>
    </Routes>
  );
};
