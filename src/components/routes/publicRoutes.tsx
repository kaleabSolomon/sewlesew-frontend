import { useAuthContext } from "@/context/authContext";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const { authData } = useAuthContext();

  if (authData?.isVerified) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
