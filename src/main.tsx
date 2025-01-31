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

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/auth/signin",
    element: <Signin />,
  },
  {
    path: "/auth/signup",
    element: <Signup />,
  },
  {
    path: "/auth/verify",
    element: <VerifyAccount />,
  },
  {
    path: "/auth/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "auth/forgot-password",
    element: <ForgotPassword />,
  },
]);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CampaingContextProvider>
      <RouterProvider router={router} />
    </CampaingContextProvider>
  </StrictMode>
);
