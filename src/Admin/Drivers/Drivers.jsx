import React, { useState, useMemo } from "react";
import { Search, Plus } from "lucide-react";
import { Toaster, toast } from "react-hot-toast";
import { CommonCards } from "@/components/CommonCards";
import DriversTable from "./DriversTable";
import allDriversData from "../../../public/driversInfo.json";
import AddDriverModal from "./AddDriverModal";
import EditDriverModal from "./EditDriverModal";

export const Drivers = () => {
  const driverCards = [
    {
      title: "Total Drivers",
      number: "24",
      numberColor: "#101828",
    },
    {
      title: "Active Drivers",
      number: "20",
      numberColor: "#1A9F42",
    },
    {
      title: "On Shift",
      number: "14",
      numberColor: "#2B7FFF",
    },
    {
      title: "Trial",
      number: "5",
      numberColor: "#FE9A00",
    },
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [drivers, setDrivers] = useState(allDriversData);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [driverToEdit, setDriverToEdit] = useState(null);

  const filteredDrivers = useMemo(() => {
    if (!searchQuery) {
      return drivers;
    }
    return drivers.filter((driver) =>
      driver.driverName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, drivers]);

  const handleAddDriver = (newDriver) => {
    // Create a new driver object with a unique ID
    const driverToAdd = {
      ...newDriver,
      id: (drivers.length + 1).toString(), // Simple ID generation
    };
    setDrivers([driverToAdd, ...drivers]); // Add new driver to the top of the list
    setIsAddModalOpen(false); // Close the modal
  };

  const handleEditDriver = (updatedDriver) => {
    setDrivers((currentDrivers) =>
      currentDrivers.map((driver) =>
        driver.id === updatedDriver.id ? updatedDriver : driver
      )
    );
    setIsEditModalOpen(false);
    setDriverToEdit(null);
    toast.success("Driver updated successfully!");
  };

  const handleDeleteDriver = (driverId) => {
    setDrivers((currentDrivers) =>
      currentDrivers.filter((driver) => driver.id !== driverId)
    );
    toast.success("Driver deleted successfully!");
  };

  const confirmDelete = (driverId) => {
    toast(
      (t) => (
        <div className="flex flex-col gap-3">
          <p>Are you sure you want to delete this driver?</p>
          <div className="flex gap-2">
            <button
              className="w-full rounded-md bg-red-500 px-3 py-1 text-sm text-white"
              onClick={() => {
                handleDeleteDriver(driverId);
                toast.dismiss(t.id);
              }}
            >
              Confirm Delete
            </button>
            <button
              className="w-full rounded-md border bg-white px-3 py-1 text-sm text-black"
              onClick={() => toast.dismiss(t.id)}
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      { duration: 6000 }
    );
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        {/* Search bar */}
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by driver name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-9 w-full rounded-[24px] border border-gray-200 bg-white pl-10 pr-3 text-sm placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        {/* Add drivers button */}
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex h-9 w-64 flex-shrink-0 items-center justify-center gap-2 rounded-[24px] border border-gray-200 bg-white px-3 text-sm font-medium text-black hover:bg-gray-50"
        >
          <Plus className="h-4 w-4" />
          <span>Add Driver</span>
        </button>
      </div>
      {/* Pass the driver-specific data to the reusable component */}
      <CommonCards cards={driverCards} />
      <Toaster position="top-center" reverseOrder={false} />
      {/* Table */}
      <DriversTable
        drivers={filteredDrivers}
        onEditRequest={(driver) => {
          setDriverToEdit(driver);
          setIsEditModalOpen(true);
        }}
        onDeleteDriver={confirmDelete}
      />
      {/* Add Driver Modal */}
      <AddDriverModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddDriver={handleAddDriver}
      />
      {/* Edit Driver Modal */}
      <EditDriverModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        driverData={driverToEdit}
        onSave={handleEditDriver}
      />
    </div>
  );
};
