import { Outlet, Navigate } from 'react-router-dom';

import { useAppSelector } from '@mern-proshop/state';

/* eslint-disable-next-line */
export interface AdminRouteProps {}

export const AdminRoute = (props: AdminRouteProps) => {
  const { userInfo } = useAppSelector((state) => state.auth);

  return userInfo && userInfo.isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
};
