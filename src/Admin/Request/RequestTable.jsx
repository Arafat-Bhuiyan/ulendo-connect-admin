"use client";

import { Link } from "react-router-dom";

export default function RequestTable({ requests }) {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-[#FE9A00]/10 border border-[#FE9A00]/20 text-[#FE9A00]";
      case "accepted":
        return "bg-[#2B7FFF]/10 border border-[#2B7FFF]/20 text-[#2B7FFF]";
      case "completed":
        return "bg-[#00C950]/10 border border-[#00C950]/20 text-[#00C950]";
      case "cancelled":
        return "bg-[#FE1A1A]/10 border border-[#FE1A1A]/20 text-[#FE1A1A]";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen">
      <div className="overflow-hidden rounded-xl border border-[#E5E7EB] bg-white">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#E5E7EB] bg-gray-50">
                <th className="px-6 py-4 text-center text-sm font-medium text-gray-600">
                  Request ID
                </th>
                <th className="px-6 py-4 text-center text-sm font-medium text-gray-600">
                  Customer
                </th>
                <th className="px-6 py-4 text-center text-sm font-medium text-gray-600">
                  Driver
                </th>
                <th className="px-6 py-4 text-center text-sm font-medium text-gray-600">
                  Location
                </th>
                <th className="px-6 py-4 text-center text-sm font-medium text-gray-600">
                  Time
                </th>
                <th className="px-6 py-4 text-center text-sm font-medium text-gray-600">
                  Status
                </th>
                <th className="px-6 py-4 text-center text-sm font-medium text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {requests.length > 0 ? (
                requests.map((request) => (
                  <tr
                    key={request.id}
                    className="border-b border-[#E5E7EB] transition-colors hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 text-center text-sm font-normal text-gray-900">
                      {request.id}
                    </td>
                    <td className="px-6 py-4 text-center text-sm font-normal text-gray-900">
                      {request.customer}
                    </td>
                    <td className="px-6 py-4 text-center text-sm font-normal text-gray-900">
                      {request.driver}
                    </td>
                    <td className="px-6 py-4 text-center text-sm font-normal text-gray-900">
                      {request.location}
                    </td>
                    <td className="px-6 py-4 text-center text-sm font-normal text-gray-900">
                      {request.time}
                    </td>
                    <td className="px-6 py-4 text-center text-sm">
                      <span
                        className={`inline-block rounded-full px-3 py-1 text-sm font-medium ${getStatusColor(
                          request.status
                        )}`}
                      >
                        {request.status}
                      </span>
                    </td>
                    <td className="flex items-center justify-center gap-2 px-6 py-4 text-sm">
                      <Link to={`/admin/requests/${request.id}`}>
                        <button className="rounded-lg bg-[#F3F4F6] px-3 py-2 text-sm font-medium text-gray-900 hover:bg-[#e0dfdf]">
                          View
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="py-6 text-center text-sm text-gray-500"
                  >
                    No requests found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
