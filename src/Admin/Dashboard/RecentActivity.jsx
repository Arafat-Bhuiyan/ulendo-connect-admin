import React from "react";

const activities = [
  {
    id: 1,
    name: "Sarah Johnson",
    action: "completed a trip",
    time: "2 minutes ago",
    color: "bg-green-500",
  },
  {
    id: 2,
    name: "Michael Chen",
    action: "booked a ride",
    time: "5 minutes ago",
    color: "bg-blue-500",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    action: "started a trip",
    time: "8 minutes ago",
    color: "bg-emerald-500",
  },
  {
    id: 4,
    name: "James Wilson",
    action: "cancelled a ride",
    time: "12 minutes ago",
    color: "bg-red-500",
  },
  {
    id: 5,
    name: "David Martinez",
    action: "completed a trip",
    time: "15 minutes ago",
    color: "bg-green-500",
  },
];

const RecentActivity = () => {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 flex flex-col gap-6 shadow-sm">
      <h3 className="text-gray-900 text-lg font-semibold inter-font">
        Recent Activity
      </h3>
      <div className="flex flex-col gap-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-start gap-4 pb-4 border-b border-gray-50 last:border-0 last:pb-0"
          >
            <div
              className={`w-2 h-2 mt-2 rounded-full ${activity.color} shrink-0`}
            />
            <div className="flex flex-col">
              <p className="text-gray-900 text-sm inter-font leading-relaxed">
                <span className="font-semibold">{activity.name}</span>{" "}
                <span className="text-gray-600">{activity.action}</span>
              </p>
              <span className="text-gray-400 text-xs inter-font">
                {activity.time}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
