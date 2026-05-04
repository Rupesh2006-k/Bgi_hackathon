import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "../App";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import SubmitComplaint from "../pages/SubmitComplaint";
import Management from "../pages/Management";
import ViewComplaints from "../pages/ViewComplaints";
import NotFound from "../components/NotFound";

import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import ProfileUpdate from "../components/profile/ProfileUpdate";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      // Public route - sab dekh sakte hain
      {
        index: true,
        element: <Home />,
      },

      // Only logout user
      {
        element: <PublicRoute />,
        children: [
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "register",
            element: <Register />,
          },
        ],
      },

      // Login required routes
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "submit",
            element: <SubmitComplaint />,
          },
          {
            path: "management",
            element: <Management />,
          },
          {
            path: "view-complaints",
            element: <ViewComplaints />,
          },
          {
            path: "profile",
            element: <ProfileUpdate />,
          },
        ],
      },

      // 404
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
