import React, { useState, useMemo } from "react";
import { Search, ChevronDown } from "lucide-react";
import { CommonCards } from "@/components/CommonCards";
import RequestTable from "./RequestTable";
import allRequestsData from "../../../public/requestsInfo.json";

export const Request = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const statuses = [
    "All Status",
    "Pending",
    "Accepted",
    "Completed",
    "Cancelled",
  ];

  const requestCards = [
    {
      title: "Pending",
      number: "1",
      numberColor: "#101828",
    },
    {
      title: "Accepted",
      number: "2",
      numberColor: "#1A9F42",
    },
    {
      title: "Completed",
      number: "2",
      numberColor: "#2B7FFF",
    },
    {
      title: "Cancelled",
      number: "1",
      numberColor: "#FE9A00",
    },
  ];

  const filteredRequests = useMemo(() => {
    return allRequestsData
      .filter((request) => {
        if (selectedStatus === "All Status") return true;
        return request.status.toLowerCase() === selectedStatus.toLowerCase();
      })
      .filter((request) => {
        const query = searchQuery.toLowerCase();
        return (
          (request.customer && request.customer.toLowerCase().includes(query)) ||
          (request.driver && request.driver.toLowerCase().includes(query))
        );
      });
  }, [searchQuery, selectedStatus]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        {/* Search bar */}
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by driver or customer name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-9 w-full rounded-[24px] border border-gray-200 bg-white pl-10 pr-3 text-sm placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        {/* All Status Dropdown */}
        <div className="relative w-64 flex-shrink-0">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex h-9 w-full items-center justify-between gap-2 rounded-[24px] border border-gray-200 bg-white px-4 text-sm font-medium text-black hover:bg-gray-50"
          >
            <span>{selectedStatus}</span>
            <ChevronDown
              className={`h-4 w-4 transition-transform ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>
          {isDropdownOpen && (
            <div className="absolute z-10 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg">
              <ul className="py-1">
                {statuses.map((status) => (
                  <li
                    key={status}
                    onClick={() => {
                      setSelectedStatus(status);
                      setIsDropdownOpen(false);
                    }}
                    className="cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {status}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <CommonCards cards={requestCards} />

      <RequestTable requests={filteredRequests} />
    </div>
  );
};
