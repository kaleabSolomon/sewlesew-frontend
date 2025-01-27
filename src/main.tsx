import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./components/ui/ErrorPage.tsx";
import { CampaingContextProvider } from "./context/campaignContext.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/auth/signin",
    element: <div>signin page</div>,
  },
]);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CampaingContextProvider>
      <RouterProvider router={router} />
    </CampaingContextProvider>
  </StrictMode>
);
