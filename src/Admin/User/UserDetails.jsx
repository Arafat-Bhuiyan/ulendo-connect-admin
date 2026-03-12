import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  Calendar, 
  UserMinus, 
  MapPin, 
  Star, 
  DollarSign, 
  CheckCircle2 
} from "lucide-react";

const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data - in a real app, this would be fetched from an API using the 'id'
  const user = {
    id: id || "U001",
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    phone: "+1 234-567-8901",
    joinedDate: "15/01/2024",
    role: "driver",
    status: "active",
    totalTrips: 342,
    completedTrips: 328,
    rating: 4.8,
    totalEarnings: "$12,450",
    image: "https://i.pravatar.cc/150?u=sarah",
  };

  const statCards = [
    { label: "Total Trips", value: user.totalTrips, icon: MapPin, color: "text-blue-600", bgColor: "bg-blue-50" },
    { label: "Completed Trips", value: user.completedTrips, icon: CheckCircle2, color: "text-green-600", bgColor: "bg-green-50" },
    { label: "Rating", value: user.rating, icon: Star, color: "text-yellow-600", bgColor: "bg-yellow-50" },
    { label: "Total Earnings", value: user.totalEarnings, icon: DollarSign, color: "text-emerald-600", bgColor: "bg-emerald-50" },
  ];

  return (
    <div className="flex flex-col gap-6 pb-10">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-all active:scale-95"
        >
          <ArrowLeft size={24} className="text-gray-900" />
        </button>
        <div className="flex flex-col">
          <h1 className="text-gray-900 text-xl font-bold inter-font">User Profile</h1>
          <p className="text-gray-500 text-sm inter-font">View and manage user details</p>
        </div>
      </div>

      {/* Profile Card */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <img 
            src={user.image} 
            alt={user.name} 
            className="w-28 h-28 rounded-full object-cover border-2 border-gray-50 shadow-sm"
          />
          <div className="flex-1 w-full">
            <div className="flex items-center justify-between mb-6">
              <div className="flex flex-col">
                <h2 className="text-gray-900 text-xl font-bold inter-font">{user.name}</h2>
                <span className="text-gray-500 text-sm inter-font font-medium">ID: {user.id}</span>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full uppercase tracking-wider">
                {user.status}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12">
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-gray-400" />
                <span className="text-gray-700 text-sm inter-font">{user.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-gray-400" />
                <span className="text-gray-700 text-sm inter-font">{user.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar size={16} className="text-gray-400" />
                <span className="text-gray-700 text-sm inter-font">Joined {user.joinedDate}</span>
              </div>
              <div>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full uppercase tracking-wider">
                  {user.role}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
              <div className={`w-10 h-10 ${stat.bgColor} ${stat.color} rounded-lg flex items-center justify-center`}>
                <Icon size={20} />
              </div>
              <div className="flex flex-col">
                <span className="text-gray-500 text-xs font-medium inter-font uppercase tracking-wider">{stat.label}</span>
                <span className="text-gray-900 text-xl font-bold inter-font">{stat.value}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Admin Actions */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col gap-4">
        <h3 className="text-gray-900 text-base font-semibold inter-font">Admin Actions</h3>
        <div>
          <button className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all active:scale-95 text-sm font-semibold shadow-lg shadow-red-500/20">
            <UserMinus size={18} />
            Suspend User
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
