import LoginPage from "@/modules/auth/pages/LoginPage";
import { createBrowserRouter, Navigate } from "react-router-dom";
import AuthLayout from "@/layouts/AuthLayout/AuthLayout";
import DashboardLayout from "@/layouts/DashboardLayout/DashboardLayout";
import DashboardPage from "@/modules/dashboard/pages/DashboardPage";
import Userpage from "@/modules/users/pages/Userpage";
import UserDetailsPage from "@/modules/users/pages/UserDetailsPage";
import ProtectedRoute from "./ProtectedRoute";
import NotFoundPage from "@/components/shared/NotFoundPage/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },

  {
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
    ],
  },

{
  element: <ProtectedRoute />,
  children: [
    {
      element: <DashboardLayout />,
      children: [
        {
          path: "/dashboard",
          element: <DashboardPage />,
        },
        {
          path: "/users",
          element: <Userpage />,
        },
        {
          path: "/users/:id",
          element: <UserDetailsPage />,
        },
      ],
    },
  ],
},

  {
    path: "*",
    element: <NotFoundPage />,
  },
]);