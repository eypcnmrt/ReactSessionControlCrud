import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

interface ProtectedRouteProps {
  element: JSX.Element;
}

const ProtectedRoute = ({ element }: ProtectedRouteProps) => {
  const authContext = useContext(AuthContext);

  if (!authContext || !authContext.state) {
    return <Navigate to="/login" replace />;
  }

  const { accessToken } = authContext.state;

  return accessToken ? element : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
