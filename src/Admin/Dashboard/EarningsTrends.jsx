import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", earnings: 85000 },
  { name: "Feb", earnings: 105000 },
  { name: "Mar", earnings: 120000 },
  { name: "Apr", earnings: 115000 },
  { name: "May", earnings: 130000 },
  { name: "Jun", earnings: 145000 },
];

const EarningsTrends = () => {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 flex flex-col gap-4 shadow-sm h-full">
      <h3 className="text-gray-900 text-lg font-semibold inter-font">
        Earnings Trends
      </h3>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#f0f0f0"
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 12 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 12 }}
              dx={-10}
              tickFormatter={(value) => `$${value / 1000}k`}
            />
            <Tooltip
              contentStyle={{
                borderRadius: "8px",
                border: "none",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              }}
              formatter={(value) => [`$${value.toLocaleString()}`, "Earnings"]}
            />
            <Line
              type="monotone"
              dataKey="earnings"
              stroke="#10b981"
              strokeWidth={3}
              dot={{ fill: "#10b981", strokeWidth: 2, r: 4, stroke: "#fff" }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EarningsTrends;
