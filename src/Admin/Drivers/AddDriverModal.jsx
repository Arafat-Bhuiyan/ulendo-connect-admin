"use client";

import React, { useState } from "react";
import { X, Eye, EyeOff } from "lucide-react";

const AddDriverModal = ({ isOpen, onClose, onAddDriver }) => {
  if (!isOpen) {
    return null;
  }

  const [driverName, setDriverName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSave = () => {
    const newDriver = {
      driverName,
      email,
      phone: contact,
      driverId: idNumber,
      // Default values for fields not in the form
      status: "Active",
      shift: "Offline",
      zone: "N/A",
    };
    onAddDriver(newDriver);
  };

  // Stop propagation to prevent modal from closing when clicking inside
  const handleModalContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    // Backdrop
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
      onClick={onClose} // Close modal on backdrop click
    >
      {/* Modal Content */}
      <div
        className="w-[844px] max-h-[90vh] overflow-y-auto rounded-lg border border-neutral-300 bg-stone-50 p-7"
        onClick={handleModalContentClick}
      >
        <div className="flex flex-col gap-5">
          {/* Header */}
          <div className="inline-flex items-center justify-between self-stretch">
            <h2 className="text-3xl font-medium leading-6 text-black">
              Add New Driver
            </h2>
            <button
              onClick={onClose}
              className="rounded-full p-2 transition-colors hover:bg-gray-200"
            >
              <X size={24} className="text-zinc-800" />
            </button>
          </div>

          {/* Form Fields */}
          <div className="flex flex-col gap-7 self-stretch">
            {/* Driver Name */}
            <div className="flex flex-col items-start justify-start gap-2 self-stretch">
              <label className="text-base font-normal leading-6 text-black">
                Driver Name
              </label>
              <input
                type="text"
                placeholder="Enter your driver name here"
                value={driverName}
                onChange={(e) => setDriverName(e.target.value)}
                className="w-full rounded-lg border border-neutral-300 p-3 text-base text-zinc-600 placeholder:text-zinc-400 focus:border-blue-600 focus:outline-none"
              />
            </div>
            {/* Email */}
            <div className="flex flex-col items-start justify-start gap-2 self-stretch">
              <label className="text-base font-normal leading-6 text-black">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your driver email here"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-neutral-300 p-3 text-base text-zinc-600 placeholder:text-zinc-400 focus:border-blue-600 focus:outline-none"
              />
            </div>
            {/* Contact */}
            <div className="flex flex-col items-start justify-start gap-2 self-stretch">
              <label className="text-base font-normal leading-6 text-black">
                Contact
              </label>
              <input
                type="tel"
                placeholder="+880 1XX XXX XXXX"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className="w-full rounded-lg border border-neutral-300 p-3 text-base text-zinc-600 placeholder:text-zinc-400 focus:border-blue-600 focus:outline-none"
              />
            </div>
            {/* Create ID Number */}
            <div className="flex flex-col items-start justify-start gap-2 self-stretch">
              <label className="text-base font-normal leading-6 text-black">
                Create a ID Number
              </label>
              <input
                type="text"
                placeholder="Create a driver id number"
                value={idNumber}
                onChange={(e) => setIdNumber(e.target.value)}
                className="w-full rounded-lg border border-neutral-300 p-3 text-base text-zinc-600 placeholder:text-zinc-400 focus:border-blue-600 focus:outline-none"
              />
            </div>

            {/* Create a ID Password */}
            <div className="flex flex-col items-start justify-start gap-2 self-stretch">
              <label className="text-base font-normal leading-6 text-black">
                Create a ID Password
              </label>
              <div className="relative w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a driver password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-neutral-300 p-3 pr-10 text-base text-zinc-600 placeholder:text-zinc-400 focus:border-blue-600 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="inline-flex items-center justify-start gap-3 self-stretch">
            <button
              onClick={onClose}
              className="flex-1 overflow-hidden rounded-3xl border border-neutral-200 bg-white px-3.5 py-3 text-center text-sm font-normal leading-5 text-zinc-800 backdrop-blur-[6px] hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex-1 overflow-hidden rounded-3xl bg-gradient-to-b from-blue-700 to-indigo-500 px-3.5 py-3 text-center text-sm font-medium leading-5 text-white backdrop-blur-[6px] hover:opacity-90"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddDriverModal;
