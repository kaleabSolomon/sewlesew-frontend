import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./components/ui/ErrorPage.tsx";
import { CampaingContextProvider } from "./context/campaignContext.tsx";
import Signin from "./pages/auth/Signin.tsx";
import Signup from "./pages/auth/Signup.tsx";
import VerifyAccount from "./pages/auth/VerifyAccount.tsx";
import ResetPassword from "./pages/auth/ResetPassword.tsx";
import ForgotPassword from "./pages/auth/ForgotPassword.tsx";
import AuthLayout from "./layout/AuthLayout.tsx";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./components/routes/protectedRoute.tsx";
import { AuthContextProvider } from "./context/authContext.tsx";
import PublicRoute from "./components/routes/publicRoutes.tsx";
import Landing from "./pages/Landing.tsx";
import HomeLayout from "./layout/homeLayout.tsx";
import CampaignDetail from "./pages/CampaignDetail.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <ProtectedRoute />,
        children: [{ path: "", element: <Landing /> }],
      },
      { path: "/campaign/:id", element: <CampaignDetail /> },
    ],
  },
  {
    path: "/auth",
    element: <PublicRoute />,
    children: [
      {
        path: "",
        element: <AuthLayout />,
        children: [
          { path: "signin", element: <Signin /> },
          { path: "signup", element: <Signup /> },
          { path: "verify", element: <VerifyAccount /> },
          { path: "forgot-password", element: <ForgotPassword /> },
          { path: "reset-password/:token", element: <ResetPassword /> },
        ],
      },
    ],
  },

  // {
  //   path: "/home",
  //   element: <ProtectedRoute />,
  //   children: [
  //     {
  //       path: "",
  //       element: <HomeLayout />,
  //       children: [{ path: "", element: <Home /> }],
  //     },
  //   ],
  // },
]);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthContextProvider>
      <CampaingContextProvider>
        <RouterProvider router={router} />
        <ToastContainer
          closeOnClick
          pauseOnFocusLoss={false}
          autoClose={3000}
          pauseOnHover={false}
        ></ToastContainer>
      </CampaingContextProvider>
    </AuthContextProvider>
  </StrictMode>
);
