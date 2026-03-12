import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Users, Settings, MapPin, Bell, LayoutDashboard, Truck } from "lucide-react";

export const Sidebar = ({ currentComponent, onMenuClick }) => {
  const navigate = useNavigate();

  const menuItems = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      active: true,
      slug: "dashboard",
    },
    { icon: Truck, label: "Drivers", slug: "drivers-management" },
    { icon: Users, label: "Customers", slug: "customers-management" },
    { icon: MapPin, label: "Live Map", slug: "map" },
    { icon: Bell, label: "Requests", slug: "requests" },
    { icon: Settings, label: "Settings", slug: "settings" },
  ];
  const location = useLocation();

  // NavLink will determine active state; build `to` from slug below.
  return (
    <div className="w-full h-[100vh]   shadow-xl flex flex-col justify-between overflow-auto [&::-webkit-scrollbar]:hidden bg-[#E1F1FB]">
      {/* Logo */}
      <div>
        <div className="w-full">
          <div className="mb-2  p-6 flex flex-col items-center gap-2.5 justify-start">
            <h1 className="logo-font font-normal text-3xl italic text-[#B1397F]">
              Mister Twister
            </h1>
            <p>Admin Dashboard</p>
          </div>
        </div>
        {/* Navigation */}
        <nav className="w-full self-start  ">
          <ul className="w-full ">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              // Dashboard should link to the admin index route
              const to =
                item.slug === "dashboard" ? "/admin" : `/admin/${item.slug}`;
              return (
                <li key={index}>
                  <NavLink
                    to={to}
                    className={() =>
                      `flex items-center h-12 pl-6 py-3 text-start text-base font-normal transition-colors mx-4 mb-1 gap-3 ${
                        location.pathname.startsWith(`/admin/${item.slug}`) ||
                        (item.slug === "dashboard" &&
                          location.pathname === "/admin")
                          ? "bg-[#B1397F] text-[#FFFFFF] rounded-xl shadow-lg backdrop-blur-md "
                          : "text-[#4A5565] rounded-sm"
                      }`
                    }
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-semibold text-base">
                      {item.label}
                    </span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
};
