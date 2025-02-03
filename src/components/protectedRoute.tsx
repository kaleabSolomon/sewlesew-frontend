import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated, decodeToken } from "../utils/auth";

const ProtectedRoute = () => {
  if (!isAuthenticated()) {
    return <Navigate to="/auth/signin" replace />;
  }

  const decodedToken = decodeToken("access_token");

  if (!decodedToken) {
    return <Navigate to="/auth/signin" replace />;
  }

  if (!decodedToken.isActive) {
    return <Navigate to="/auth/signin" replace />;
  }

  if (!decodedToken.isVerified) {
    return <Navigate to="/auth/verify" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
