"use client";

import { MapPin } from "lucide-react";

export default function CustomersTable({ customers }) {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-[#00C950]/10 border border-[#00C950]/20 text-[#00C950]";
      case "inactive":
        return "bg-[#6A7282]/10 border border-[#6A7282]/20 text-[#6A7282]";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen">
      {/* Table */}
      <div className="bg-white rounded-xl border border-[#E5E7EB] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#E5E7EB] bg-gray-50">
                <th className="px-6 py-4 text-center text-sm font-medium text-gray-600">
                  Customer Name
                </th>
                <th className="px-6 py-4 text-center text-sm font-medium text-gray-600">
                  Email
                </th>
                <th className="px-6 py-4 text-center text-sm font-medium text-gray-600">
                  Phone
                </th>
                <th className="px-6 py-4 text-center text-sm font-medium text-gray-600">
                  Last Request
                </th>
                <th className="px-6 py-4 text-center text-sm font-medium text-gray-600">
                  Location
                </th>
                <th className="px-6 py-4 text-center text-sm font-medium text-gray-600">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {customers.length > 0 ? (
                customers.map((customer) => (
                  <tr
                    key={customer.id}
                    className="border-b border-[#E5E7EB] hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-center text-sm font-normal text-gray-900 ">
                      {customer.name}
                    </td>
                    <td className="px-6 py-4 text-center text-sm font-normal text-gray-900">
                      {customer.email}
                    </td>
                    <td className="px-6 py-4 text-center text-sm font-normal text-gray-900">
                      {customer.phone}
                    </td>

                    <td className="px-6 py-4 text-center text-sm font-normal text-gray-900">
                      {customer.lastrequest}
                    </td>

                    <td className="px-6 py-4 text-center text-sm font-normal text-gray-900">
                      <div className="inline-flex items-center gap-2">
                        <MapPin size={16} color="#4A5565" /> {customer.location}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center text-sm">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                          customer.status
                        )}`}
                      >
                        {customer.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center py-6 text-gray-500 text-sm"
                  >
                    No customers found.
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
