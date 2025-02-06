import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../../utils/auth";
import { useAuthContext } from "@/context/authContext";

const ProtectedRoute = () => {
  const { authData } = useAuthContext();

  // if (!isAuthenticated()) {
  //   return <Navigate to="/auth/signin" replace />;
  // }

  // console.log(authData);

  if (isAuthenticated() && !authData?.isActive) {
    return <Navigate to="/auth/signin" replace />;
  }

  if (isAuthenticated() && !authData?.isVerified) {
    return <Navigate to="/auth/verify" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
