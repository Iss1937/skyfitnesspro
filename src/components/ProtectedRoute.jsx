import { Outlet, Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ redirectPath = '/', isAllowed }) => {
  const accessAllowed = isAllowed ?? Boolean(localStorage.getItem('userUid'));

  if (!accessAllowed) {
    return <Navigate to={redirectPath} replace={true} />;
  }
  return <Outlet />;
};
