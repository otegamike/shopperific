// react router
import { Navigate, Outlet } from 'react-router-dom';

// hooks
import { useAuth } from '../../hooks/useAuth';

// utils
import { alertObj } from '../../utils/alerts/alert';

const RequireSeller = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading session...</div>;
  }

  if (user?.role !== "seller") {
    alertObj("You must be a seller to access this page", "error");
    return <Navigate to="/become-seller" replace />
  }

  return <Outlet />;
};

export default RequireSeller;