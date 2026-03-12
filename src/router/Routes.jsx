import Login from "@/Admin/Auth/Login";
import MainDashboard from "@/Admin/Dashboard/MainDashboard";
import AdminLayout from "@/layouts/AdminLayout";
import { createBrowserRouter, Navigate } from "react-router-dom";
import TermsAndPolicies from "@/Admin/Settings/Settings";

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
      { path: "user-management", element: <>User Management</> },
      { path: "drivers-management", element: <>Driver Management</> },
      { path: "promo-codes", element: <>Promo Codes</> },
      { path: "rates", element: <>Rate & Commission</> },
      { path: "payments", element: <>Payment Management</> },
      { path: "complaints", element: <>Complaints</> },
      { path: "settings", element: <TermsAndPolicies /> },
    ],
  },
]);

export default router;
