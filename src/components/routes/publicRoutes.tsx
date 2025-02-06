import { useAuthContext } from "@/context/authContext";
import { isAuthenticated } from "@/utils/auth";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const { authData } = useAuthContext();
  if (isAuthenticated() && authData?.isVerified) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
