import useLocalUser from "@/hooks/useLocalStorage";
import { isAuthenticated } from "@/utils/auth";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const { user } = useLocalUser();

  if (isAuthenticated() && user?.isVerified) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
