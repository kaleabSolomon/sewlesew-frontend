import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./components/ui/ErrorPage.tsx";
import { CampaingContextProvider } from "./context/campaignContext.tsx";
import Signin from "./pages/auth/Signin.tsx";
import Signup from "./pages/auth/Signup.tsx";

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
]);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CampaingContextProvider>
      <RouterProvider router={router} />
    </CampaingContextProvider>
  </StrictMode>
);
