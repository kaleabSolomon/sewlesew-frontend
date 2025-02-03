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

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "signin", element: <Signin /> },
      { path: "signup", element: <Signup /> },
      { path: "verify", element: <VerifyAccount /> },
      { path: "forgot-password", element: <ForgotPassword /> },
      { path: "reset-password/:token", element: <ResetPassword /> }, // Secure reset password
    ],
  },
]);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CampaingContextProvider>
      <RouterProvider router={router} />
      <ToastContainer
        closeOnClick
        pauseOnFocusLoss={false}
        autoClose={3000}
        pauseOnHover={false}
      ></ToastContainer>
    </CampaingContextProvider>
  </StrictMode>
);
