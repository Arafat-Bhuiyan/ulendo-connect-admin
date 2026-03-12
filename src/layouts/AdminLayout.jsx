import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Sidebar } from "@/Admin/Dashboard/Sidebar";
import Header from "@/Admin/Dashboard/Header";

export default function AdminLayout() {
  // State for currently selected menu in the sidebar
  console.log("first");

  const location = useLocation();

  const title = location.pathname.startsWith(`/admin/drivers-management`)
    ? "Drivers Management"
    : location.pathname.startsWith(`/admin/customers-management`)
    ? "Customers Management"
    : location.pathname.startsWith(`/admin/map`)
    ? "Live Driver Map"
    : location.pathname.startsWith(`/admin/requests`)
    ? "Customer Requests"
    : location.pathname.startsWith(`/admin/settings`)
    ? "Settings"
    : "Dashboard Overview";

  const subtitle = location.pathname.startsWith(`/admin/drivers-management`)
    ? "Manage all ice cream truck drivers"
    : location.pathname.startsWith(`/admin/customers-management`)
    ? "View and manage all registered customers"
    : location.pathname.startsWith(`/admin/map`)
    ? "Real-time tracking of all active drivers"
    : location.pathname.startsWith(`/admin/requests`)
    ? "Monitor all ice cream delivery requests"
    : location.pathname.startsWith(`/admin/settings`)
    ? "Manage admin account and system configuration"
    : "Welcome back! Here's what's happening today.";
  return (
    <div
      style={{ fontFamily: "Montserrat" }}
      className="flex font-poppins "
    >
      {/* Sidebar */}
      <div className="w-72 fixed top-0 left-0 h-screen">
        <Sidebar />
      </div>

      {/* Main Content area (pages render into the Outlet) */}
      <div className="flex-1 ml-72 min-h-screen overflow-y-auto">
        <Header title={title} subtitle={subtitle}/>
        <div className="px-6 bg-[#FBFBFB] min-h-screen">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
