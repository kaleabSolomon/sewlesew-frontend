import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
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
import Home from "./pages/home/home.tsx";
import { AuthContextProvider } from "./context/authContext.tsx";
import PublicRoute from "./components/routes/publicRoutes.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/home",
    element: <ProtectedRoute />,
    children: [{ path: "", element: <Home /> }],
  },
  {
    path: "/auth",
    element: <PublicRoute />, // ✅ PublicRoute now wraps AuthLayout
    children: [
      {
        path: "",
        element: <AuthLayout />, // ✅ Keeps the layout for all auth pages
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
