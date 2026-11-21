
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

function ProtectedRoute() {
  const { user, isAdmin } = useAuth();
  const location = useLocation();

  // Redirect visitors who are not signed in.
  if (!user) {
    return (
      <Navigate
        to="/signin"
        replace
        state={{ message: "Please sign in to access this page." }}
      />
    );
  }

  // Only Admin accounts can access the dashboard.
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;

