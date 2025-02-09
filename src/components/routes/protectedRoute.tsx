import { Navigate, Outlet } from "react-router-dom";
import { jwtPayload } from "@/types/auth";
import { isAuthenticated } from "@/utils/auth";

const getStoredUser = (): jwtPayload | null => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

const ProtectedRoute = () => {
  const user = getStoredUser();

  if (!isAuthenticated()) {
    return <Navigate to="/auth/signin" replace />;
  }

  if (user && !user.isActive) {
    return <Navigate to="/auth/signin" replace />;
  }

  if (user && !user.isVerified) {
    return <Navigate to="/auth/verify" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
