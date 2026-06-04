import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const GuestRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (user) {
    switch (user.role) {
      case "ADMIN":
        return <Navigate to="/admin/dashboard" replace />;
      case "STORE_OWNER":
        return <Navigate to="/owner/dashboard" replace />;
      default:
        return <Navigate to="/stores" replace />;
    }
  }

  return children;
};

export default GuestRoute;
