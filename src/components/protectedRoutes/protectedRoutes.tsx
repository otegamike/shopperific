// react router
import { Navigate, Outlet, useLocation } from 'react-router-dom';

// hooks
import { useAuth } from '../../hooks/useAuth';

// utils
import { alertObj } from '../../utils/alerts/alert';

const ProtectedRoute = () => {
  const { user, isLoading } = useAuth();
  const location = useLocation(); // To remember where they were trying to go

  // 1. While checking if a silent refresh cookie exists, show nothing or a spinner
  if (isLoading) {
    return <div>Loading session...</div>;
  }

  // 2. If not logged in, redirect to login page. 
  // We use 'state' to save the current location so we can send them back after login.
  if (!user) {
    alertObj("You must be logged in to access this page", "error");
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // 3. If logged in, render the actual route content
  return <Outlet />;
};

export default ProtectedRoute;