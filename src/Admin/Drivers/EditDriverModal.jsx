"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

const EditDriverModal = ({ isOpen, onClose, driverData, onSave }) => {
  const [formData, setFormData] = useState({
    driverName: "",
    email: "",
    phone: "",
    driverId: "",
    zone: "",
  });

  useEffect(() => {
    if (driverData) {
      setFormData({
        driverName: driverData.driverName || "",
        email: driverData.email || "",
        phone: driverData.phone || "",
        driverId: driverData.driverId || "",
        zone: driverData.zone || "",
      });
    }
  }, [driverData]);

  if (!isOpen) {
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave({ ...driverData, ...formData });
  };

  const handleModalContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-[844px] max-h-[90vh] overflow-y-auto rounded-lg border border-neutral-300 bg-stone-50 p-7"
        onClick={handleModalContentClick}
      >
        <div className="flex flex-col gap-5">
          <div className="inline-flex items-center justify-between self-stretch">
            <h2 className="text-3xl font-medium leading-6 text-black">
              Edit Driver
            </h2>
            <button
              onClick={onClose}
              className="rounded-full p-2 transition-colors hover:bg-gray-200"
            >
              <X size={24} className="text-zinc-800" />
            </button>
          </div>

          <div className="flex flex-col gap-7 self-stretch">
            {/* Form fields */}
            <div className="flex flex-col items-start justify-start gap-2">
              <label className="text-base font-normal leading-6 text-black">Driver Name</label>
              <input type="text" name="driverName" value={formData.driverName} onChange={handleChange} className="w-full rounded-lg border border-neutral-300 p-3 text-base text-zinc-600 placeholder:text-zinc-400 focus:border-blue-600 focus:outline-none" />
            </div>
            <div className="flex flex-col items-start justify-start gap-2">
              <label className="text-base font-normal leading-6 text-black">Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full rounded-lg border border-neutral-300 p-3 text-base text-zinc-600 placeholder:text-zinc-400 focus:border-blue-600 focus:outline-none" />
            </div>
            <div className="flex flex-col items-start justify-start gap-2">
              <label className="text-base font-normal leading-6 text-black">Phone</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full rounded-lg border border-neutral-300 p-3 text-base text-zinc-600 placeholder:text-zinc-400 focus:border-blue-600 focus:outline-none" />
            </div>
            <div className="flex flex-col items-start justify-start gap-2">
              <label className="text-base font-normal leading-6 text-black">Driver ID</label>
              <input type="text" name="driverId" value={formData.driverId} onChange={handleChange} className="w-full rounded-lg border border-neutral-300 p-3 text-base text-zinc-600 placeholder:text-zinc-400 focus:border-blue-600 focus:outline-none" />
            </div>
            <div className="flex flex-col items-start justify-start gap-2">
              <label className="text-base font-normal leading-6 text-black">Zone</label>
              <input type="text" name="zone" value={formData.zone} onChange={handleChange} className="w-full rounded-lg border border-neutral-300 p-3 text-base text-zinc-600 placeholder:text-zinc-400 focus:border-blue-600 focus:outline-none" />
            </div>
          </div>

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
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditDriverModal;