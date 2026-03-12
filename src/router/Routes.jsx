import Login from "@/Admin/Auth/Login";
import MainDashboard from "@/Admin/Dashboard/MainDashboard";
import AdminLayout from "@/layouts/AdminLayout";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { Customers } from "@/Admin/Customers/Customers";
import { Drivers } from "@/Admin/Drivers/Drivers";
import { Request } from "@/Admin/Request/Request";
import RequestDetailsCard from "@/Admin/Request/RequestDetails";
import TermsAndPolicies from "@/Admin/Settings/Settings";
import { Map } from "@/Admin/Map/Map";

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
      { path: "drivers-management", element: <Drivers /> },
      { path: "customers-management", element: <Customers /> },
      { path: "map", element: <Map /> },
      { path: "settings", element: <TermsAndPolicies /> },
      { path: "requests", element: <Request /> },
      { path: "requests/:id", element: <RequestDetailsCard /> },

      // future admin sub-routes can be added here, e.g.:
      // { path: "users", element: <UserManagement /> },
    ],
  },
]);

export default router;
