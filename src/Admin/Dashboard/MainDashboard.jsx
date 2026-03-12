import React from "react";
import { 
  Users, 
  Car, 
  UserCircle, 
  MapPin, 
  CheckCircle2, 
  XCircle, 
  DollarSign, 
  Clock, 
  Star 
} from "lucide-react";
import StatCard from "./StatCard";
import TripAnalytics from "./TripAnalytics";
import EarningsTrends from "./EarningsTrends";
import RecentActivity from "./RecentActivity";
import NewUsers from "./NewUsers";

const stats = [
  { id: 1, title: "Total Users", value: "12,847", icon: Users, color: "bg-blue-500" },
  { id: 2, title: "Total Drivers", value: "4,523", icon: Car, color: "bg-green-500" },
  { id: 3, title: "Total Passengers", value: "8,324", icon: UserCircle, color: "bg-purple-500" },
  { id: 4, title: "Total Trips", value: "45,678", icon: MapPin, color: "bg-orange-500" },
  { id: 5, title: "Completed Trips", value: "43,892", icon: CheckCircle2, color: "bg-teal-500" },
  { id: 6, title: "Cancelled Trips", value: "1,786", icon: XCircle, color: "bg-red-500" },
  { id: 7, title: "Total Earnings", value: "$1,234,567.89", icon: DollarSign, color: "bg-emerald-500" },
  { id: 8, title: "Pending Payments", value: "$23,456.50", icon: Clock, color: "bg-yellow-500" },
  { id: 9, title: "Average Rating", value: "4.7", icon: Star, color: "bg-amber-500" },
];

const MainDashboard = () => {
  return (
    <div className="flex flex-col gap-8 pb-10">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <StatCard key={stat.id} {...stat} />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TripAnalytics />
        <EarningsTrends />
      </div>

      {/* Lists Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivity />
        <NewUsers />
      </div>
    </div>
  );
};

export default MainDashboard;
