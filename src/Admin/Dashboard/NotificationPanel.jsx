import React from "react";
import { Bell, X, Landmark, ShieldAlert, History, CreditCard, MessageSquare, User } from "lucide-react";

const NotificationPanel = ({ onClose }) => {
  const [notifications, setNotifications] = React.useState([
    {
      id: 1,
      title: "New Business Registration",
      desc: "TechCorp Solutions has registered on the platform",
      time: "2 minutes ago",
      icon: <Landmark className="text-blue-600" size={20} />,
      iconBg: "bg-blue-100",
      unread: true,
      type: "system"
    },
    {
      id: 2,
      title: "Payment Received",
      desc: "Digital Marketing Pro upgraded to Professional plan - $99",
      time: "15 minutes ago",
      icon: <CreditCard className="text-green-600" size={20} />,
      iconBg: "bg-green-100",
      unread: true,
      type: "system"
    },
    {
      id: 3,
      title: "Failed Login Attempt",
      desc: "Suspicious login attempt from unknown location detected",
      time: "1 hour ago",
      icon: <ShieldAlert className="text-red-600" size={20} />,
      iconBg: "bg-red-100",
      unread: true,
      type: "security"
    },
    {
      id: 4,
      title: "Customer Complaint",
      desc: "John Doe reported an issue with the last ride",
      time: "2 hours ago",
      icon: <User className="text-orange-600" size={20} />,
      iconBg: "bg-orange-100",
      unread: true,
      type: "complaint"
    },
    {
      id: 5,
      title: "Driver Complaint",
      desc: "Driver Smith reported a payment discrepancy",
      time: "3 hours ago",
      icon: <MessageSquare className="text-amber-600" size={20} />,
      iconBg: "bg-amber-100",
      unread: true,
      type: "complaint"
    }
  ]);

  const [visibleCount, setVisibleCount] = React.useState(4);
  const unreadCount = notifications.filter(n => n.unread).length;

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const handleViewMore = () => {
    setVisibleCount(notifications.length);
  };

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/5" onClick={onClose} />
      <div className="absolute right-0 top-full mt-4 w-[400px] h-[700px] bg-white shadow-2xl z-50 flex flex-col rounded-xl overflow-hidden border border-gray-100">
        {/* Panel Header */}
        <div className="h-20 px-6 border-b border-black/10 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 flex items-center justify-center">
              <Bell size={18} className="text-neutral-950" />
            </div>
            <div className="flex flex-col">
              <span className="text-neutral-950 text-xl font-semibold roboto-serif leading-tight">Notifications</span>
              {unreadCount > 0 && (
                <span className="text-gray-500 text-xs font-normal roboto-serif">
                  {unreadCount} unread
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-4">
            {unreadCount > 0 && (
              <button 
                onClick={handleMarkAllRead}
                className="text-neutral-950 text-xs font-normal roboto-serif hover:bg-gray-100 px-3 py-2 rounded-lg transition-colors"
              >
                Mark all read
              </button>
            )}
            <X 
              size={20} 
              className="cursor-pointer text-gray-400 hover:text-black transition-colors" 
              onClick={onClose} 
            />
          </div>
        </div>

        {/* Panel Content */}
        <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-gray-200">
          {notifications.slice(0, visibleCount).map((notif) => (
            <div 
              key={notif.id} 
              className={`p-6 border-b border-black/5 flex gap-4 transition-colors hover:bg-gray-50 cursor-pointer ${notif.unread ? "bg-gray-200/20" : ""}`}
              onClick={() => {
                setNotifications(prev => prev.map(n => n.id === notif.id ? { ...n, unread: false } : n));
              }}
            >
              <div className={`w-10 h-10 shrink-0 ${notif.iconBg} rounded-[10px] flex justify-center items-center`}>
                {notif.icon}
              </div>
              <div className="flex-1 flex flex-col gap-1">
                <div className="flex justify-between items-start">
                  <span className="text-neutral-950 text-[15px] font-medium roboto-serif leading-6">{notif.title}</span>
                  {notif.unread && <div className="w-2 h-2 bg-blue-600 rounded-full mt-2" />}
                </div>
                <p className="text-gray-500 text-[13px] font-normal roboto-serif leading-snug">
                  {notif.desc}
                </p>
                <span className="text-gray-400 text-xs font-normal roboto-serif mt-1">
                  {notif.time}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Panel Footer */}
        {visibleCount < notifications.length && (
          <div className="p-4 border-t border-black/10 shrink-0">
            <button 
              onClick={handleViewMore}
              className="w-full h-10 bg-white border border-black/10 rounded-lg text-neutral-950 text-sm roboto-serif hover:bg-gray-50 transition-all font-medium"
            >
              View All Activity
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default NotificationPanel;
