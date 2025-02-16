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
import PublicRoute from "./components/routes/publicRoutes.tsx";
import Landing from "./pages/Landing.tsx";
import HomeLayout from "./layout/homeLayout.tsx";
import CampaignDetail from "./pages/campaign/CampaignDetail.tsx";
import CampaignSelection from "./pages/campaign/CreateCampaignType.tsx";
import CreateCampaign from "./pages/campaign/CreateCampaign.tsx";
import ConfirmationPage from "./pages/campaign/CampaignConfirmation.tsx";
import ProfilePage from "./pages/profile/Profile.tsx";
import { UserContextProvider } from "./context/userContext.tsx";
import CampaignsAdvanced from "./components/CampaignsAdvanced.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "", element: <Landing /> },
      {
        path: "",
        element: <ProtectedRoute />,
        children: [
          { path: "/campaign/create", element: <CampaignSelection /> },
          { path: "/campaign/create/:type", element: <CreateCampaign /> },
        ],
      },
      { path: "/campaign/:id", element: <CampaignDetail /> },
      {
        path: "campaign/confirmation",
        element: <ConfirmationPage />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
      {
        path: "campaigns",
        element: <CampaignsAdvanced />,
      },
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
]);

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

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CampaingContextProvider>
      <UserContextProvider>
        <RouterProvider router={router} />
        <ToastContainer
          closeOnClick
          pauseOnFocusLoss={false}
          autoClose={3000}
          pauseOnHover={false}
        ></ToastContainer>
      </UserContextProvider>
    </CampaingContextProvider>
  </StrictMode>
);
