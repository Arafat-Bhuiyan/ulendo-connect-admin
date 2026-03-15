import Login from "@/Admin/Auth/Login";
import MainDashboard from "@/Admin/Dashboard/MainDashboard";
import AdminLayout from "@/layouts/AdminLayout";
import { createBrowserRouter, Navigate } from "react-router-dom";
import TermsAndPolicies from "@/Admin/Settings/Settings";
import User from "@/Admin/User/User";
import UserDetails from "@/Admin/User/UserDetails";
import Drivers from "@/Admin/Drivers/Drivers";

import Promo from "@/Admin/Promo/Promo";
import Rate from "@/Admin/Rate/Rate";
import Payment from "@/Admin/Payment/Payment";
import Complaint from "@/Admin/Complaint/Complaint";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/admin" replace />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    errorElement: <h2>Route not found</h2>,
    children: [
      {
        index: true,
        element: <MainDashboard />,
      },
      { path: "user-management", element: <User /> },
      { path: "user-management/:id", element: <UserDetails /> },
      { path: "drivers-management", element: <Drivers /> },
      { path: "promo-codes", element: <Promo /> },
      { path: "rates", element: <Rate /> },
      { path: "payments", element: <Payment /> },
      { path: "complaints", element: <Complaint /> },
      { path: "settings", element: <TermsAndPolicies /> },
    ],
  },
]);

export default router;
