import { Outlet, Navigate } from 'react-router-dom';

import { useAppSelector } from '@mern-proshop/state';

/* eslint-disable-next-line */
export interface PrivateRouteProps {}

export const PrivateRoute = (props: PrivateRouteProps) => {
  const { userInfo } = useAppSelector((state) => state.auth);

  return userInfo ? <Outlet /> : <Navigate to="/login" replace />;
};
