import { createBrowserRouter, RouterProvider } from "react-router-dom";

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
import RoleRoute from "./RoleRoute";

import ProfileUpdate from "../components/profile/ProfileUpdate";
import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },

      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "submit",
            element: <SubmitComplaint />,
          },
          {
            path: "view-complaints",
            element: <ViewComplaints />,
          },
          {
            path: "profile",
            element: <ProfileUpdate />,
          },

          // only admin
          {
            element: <RoleRoute allowedRoles={["admin"]} />,
            children: [
              {
                path: "dashboard",
                element: <Dashboard />,
              },
              {
                path: "management",
                element: <Management />,
              },
            ],
          },
        ],
      },

      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },

  {
    path: "/",
    element: <AuthLayout />,
    children: [
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
    ],
  },
]);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
