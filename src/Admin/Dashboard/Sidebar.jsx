import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { 
  Users, 
  Settings, 
  LayoutGrid, 
  UserCheck, 
  Ticket, 
  TrendingUp, 
  CreditCard, 
  MessageSquare, 
  LogOut 
} from "lucide-react";
import logo from "../../assets/img/logo2.png";

export const Sidebar = ({ currentComponent, onMenuClick }) => {
  const navigate = useNavigate();

  const menuItems = [
    {
      icon: LayoutGrid,
      label: "Dashboard",
      slug: "dashboard",
    },
    { icon: Users, label: "User Management", slug: "user-management" },
    { icon: UserCheck, label: "Driver Verification", slug: "drivers-management" },
    { icon: Ticket, label: "Promo Codes", slug: "promo-codes" },
    { icon: TrendingUp, label: "Rate & Commission", slug: "rates" },
    { icon: CreditCard, label: "Payment Management", slug: "payments" },
    { icon: MessageSquare, label: "Complaints", slug: "complaints" },
    { icon: Settings, label: "Settings", slug: "settings" },
  ];
  const location = useLocation();

  // NavLink will determine active state; build `to` from slug below.
  return (
    <div className="w-full h-[100vh] shadow-xl flex flex-col justify-between overflow-auto [&::-webkit-scrollbar]:hidden bg-black">
      {/* Logo */}
      <div>
        <div className="w-full">
          <div className="mb-5 border-b-[1.18px] border-zinc-600/50 p-6 flex flex-col items-center gap-2.5 justify-start">
            <img src={logo} alt="logo" className="w-48 h-24 mx-auto" />
          </div>
        </div>
        {/* Navigation */}
        <nav className="w-full self-start  ">
          <ul className="w-full ">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = 
                location.pathname.startsWith(`/admin/${item.slug}`) || 
                (item.slug === "dashboard" && location.pathname === "/admin");
              
              const to = item.slug === "dashboard" ? "/admin" : `/admin/${item.slug}`;
              
              return (
                <li key={index} className="px-4">
                  <NavLink
                    to={to}
                    className={`flex items-center h-12 px-4 py-3 text-start text-base font-normal transition-all duration-200 mb-2 gap-4 rounded-xl ${
                      isActive
                        ? "bg-[#1A1A1A] text-white shadow-sm"
                        : "text-[#99A1AF] hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <Icon size={22} strokeWidth={isActive ? 2 : 1.5} />
                    <span className="text-base font-medium">
                      {item.label}
                    </span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      <div className="p-6">
        <button
          onClick={() => navigate("/login")}
          className="w-full h-11 flex items-center justify-center gap-3 text-[#99A1AF]"
        >
          <LogOut size={20} className="group-hover:scale-110 transition-transform" />
          <span className="text-base font-semibold">Log Out</span>
        </button>
      </div>
    </div>
  );
};
