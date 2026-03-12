import React from "react";
import profile from "@/assets/images/profile.jpg";
import { Bell } from "lucide-react";
import NotificationPanel from "./NotificationPanel";

const Header = ({ title, subtitle }) => {
  const [showNotifications, setShowNotifications] = React.useState(false);
  const [hasOpened, setHasOpened] = React.useState(false);

  const toggleNotifications = () => {
    if (!showNotifications) {
      setHasOpened(true);
    }
    setShowNotifications(!showNotifications);
  };

  return (
    <div className="flex items-center justify-between px-6 py-7 bg-[#FBFBFB]">
      <div>
        {title === "Dashboard Overview" ? (
          <div className="justify-start">
            <span className="text-black text-3xl font-semibold roboto-serif leading-8">
              Welcome
            </span>
            <span className="text-gray-800 text-2xl font-normal roboto-serif leading-8">
              ,{" "}
            </span>
            <span className="text-gray-800 text-xl font-normal roboto-serif leading-8">
              Admin Dashboard
            </span>
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            <h1 className="text-black text-3xl font-semibold roboto-serif leading-8">
              {title}
            </h1>
            {subtitle && (
              <p className="text-gray-500 text-sm font-normal inter-font">
                {subtitle}
              </p>
            )}
          </div>
        )}
      </div>
      <div className="flex items-center gap-3 relative">
        <div 
          className="relative cursor-pointer hover:bg-gray-100 p-2 rounded-full transition-colors" 
          onClick={toggleNotifications}
        >
          <Bell size={22} strokeWidth={1.5} />
          {!hasOpened && (
            <div className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full outline outline-1 outline-offset-[-0.90px] outline-black/0 flex justify-center items-center overflow-hidden">
              <span className="text-white text-[9px] font-normal leading-none font-sans">5</span>
            </div>
          )}
        </div>

        {/* Notification Panel */}
        {showNotifications && (
          <NotificationPanel onClose={() => setShowNotifications(false)} />
        )}

        <div>
          <button className="w-10 h-10 rounded-full overflow-hidden bg-[#F5F3F3] border border-[#093349] font-bold text-base">
            <img src={profile} alt="" className="w-full h-full object-cover" />
          </button>
        </div>
        <div className="flex flex-col">
          <h1 className="text-neutral-950 text-sm font-semibold roboto-serif leading-tight">
            Admin User
          </h1>
          <h2 className="text-gray-500 text-[11px] font-normal roboto-serif">admin@rideshare.com</h2>
        </div>
      </div>
    </div>
  );
};

export default Header;
