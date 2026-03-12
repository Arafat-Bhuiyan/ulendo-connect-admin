import React from "react";

const StatCard = ({ title, value, icon: Icon, color }) => {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 flex items-center justify-between shadow-sm">
      <div className="flex flex-col gap-1">
        <span className="text-gray-500 text-sm font-medium inter-font">
          {title}
        </span>
        <span className="text-gray-900 text-2xl font-bold inter-font">
          {value}
        </span>
      </div>
      <div
        className={`w-12 h-12 ${color} rounded-xl flex justify-center items-center shrink-0 shadow-sm`}
      >
        <Icon size={24} className="text-white" />
      </div>
    </div>
  );
};

export default StatCard;
