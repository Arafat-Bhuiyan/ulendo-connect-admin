import React, { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { CommonCards } from "@/components/CommonCards";
import CustomersTable from "./CustomersTable";
import allCustomersData from "../../../public/customersInfo.json";

export const Customers = () => {
  const customersCards = [
    {
      title: "Total Customers",
      number: "24",
      numberColor: "#101828",
    },
    {
      title: "Active Customers",
      number: "20",
      numberColor: "#1A9F42",
    },
    {
      title: "Total Requests",
      number: "14",
      numberColor: "#2B7FFF",
    },
    {
      title: "Recent Activity",
      number: "5",
      numberColor: "#FE9A00",
    },
  ];

  const [searchQuery, setSearchQuery] = useState("");

  const filteredCustomers = useMemo(() => {
    if (!searchQuery) {
      return allCustomersData;
    }
    return allCustomersData.filter((customer) =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, allCustomersData]);
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        {/* Search bar */}
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by customer name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-9 w-full rounded-[24px] border border-gray-200 bg-white pl-10 pr-3 text-sm placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>
      {/* Pass the driver-specific data to the reusable component */}
      <CommonCards cards={customersCards} />
      {/* Table */}
      <CustomersTable customers={filteredCustomers} />
    </div>
  );
};
