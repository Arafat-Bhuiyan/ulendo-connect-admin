import React, { useState, useEffect } from "react";
import { driversData } from "./Drivers";
import { UploadCloud, X } from "lucide-react";
import toast from "react-hot-toast";

const ImageUploadPreview = ({ heightClass, onImageChange }) => {
  const [image, setImage] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const imgUrl = URL.createObjectURL(e.target.files[0]);
      setImage(imgUrl);
      if (onImageChange) {
        onImageChange();
      }
    }
  };

  return (
    <div className={`w-full ${heightClass} relative group`}>
      <label className="w-full h-full relative bg-gray-900 rounded-[10px] border border-gray-200 flex justify-center items-center cursor-pointer overflow-hidden">
        {image ? (
          <img
            src={image}
            className="w-full h-full object-cover"
            alt="Uploaded"
          />
        ) : (
          <div className="flex flex-col items-center text-gray-400 group-hover:text-white transition-colors">
            <UploadCloud className="w-8 h-8 mb-2" />
            <span className="text-sm font-medium">Click to upload</span>
          </div>
        )}
        <input
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
};

const DriverDetailsModal = ({ isOpen, onClose, driverId, onUpdateStatus }) => {
  const [driver, setDriver] = useState(null);
  const [status, setStatus] = useState("");
  const [hasUnsavedImages, setHasUnsavedImages] = useState(false);

  useEffect(() => {
    if (isOpen && driverId) {
      const foundDriver = driversData.find((d) => d.id === driverId);
      if (foundDriver) {
        setDriver(foundDriver);
        setStatus(foundDriver.status);
      }
    }
  }, [isOpen, driverId]);

  if (!isOpen || !driver) {
    return null;
  }

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    const index = driversData.findIndex((d) => d.id === driverId);
    if (index !== -1) {
      driversData[index].status = newStatus;
    }
    if (onUpdateStatus) {
      onUpdateStatus(driverId, newStatus);
    }
  };

  const handleImageChange = () => {
    setHasUnsavedImages(true);
  };

  const handleMultiSave = () => {
    toast.success("All images saved successfully!", {
      position: "top-center",
    });
    setHasUnsavedImages(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 overflow-y-auto">
      <div className="relative w-full max-w-[857px] p-6 flex flex-col items-start gap-6 font-sans bg-white rounded-xl shadow-xl mt-auto mb-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full p-2 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

      {/* Header Info */}
      <div className="w-full flex items-center gap-4">
        <img
          className="w-20 h-20 rounded-full object-cover shadow-sm bg-gray-100"
          src={driver.avatar}
          alt={driver.name}
        />
        <div className="flex flex-col flex-1">
          <h2 className="text-gray-900 text-lg font-semibold leading-7">
            {driver.name}
          </h2>
          <p className="text-gray-600 text-base font-normal leading-6">
            {driver.email}
          </p>
          <p className="text-gray-600 text-base font-normal leading-6">
            {driver.phone}
          </p>
        </div>
        <div>
          {hasUnsavedImages && (
            <button
              onClick={handleMultiSave}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-[10px] transition-colors shadow-sm"
            >
              Save
            </button>
          )}
        </div>
      </div>

      {/* Images Grid */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-[34px] gap-y-6">
        <div className="flex flex-col gap-2">
          <label className="text-gray-700 text-sm font-medium leading-5">
            Driver Image
          </label>
          <ImageUploadPreview heightClass="h-48" onImageChange={handleImageChange} />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-gray-700 text-sm font-medium leading-5">
            Number Plate
          </label>
          <ImageUploadPreview heightClass="h-48" onImageChange={handleImageChange} />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-gray-700 text-sm font-medium leading-5">
            Car Photo
          </label>
          <div className="grid grid-cols-2 grid-rows-2 gap-2 h-64">
            <ImageUploadPreview heightClass="h-full" onImageChange={handleImageChange} />
            <ImageUploadPreview heightClass="h-full" onImageChange={handleImageChange} />
            <ImageUploadPreview heightClass="h-full" onImageChange={handleImageChange} />
            <ImageUploadPreview heightClass="h-full" onImageChange={handleImageChange} />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-gray-700 text-sm font-medium leading-5">
            Driving License
          </label>
          <ImageUploadPreview heightClass="h-64" onImageChange={handleImageChange} />
        </div>
      </div>

      {/* Car Details Info Box */}
      <div className="w-full p-4 bg-gray-50 rounded-[10px] flex flex-col gap-2 mt-2">
        <h3 className="text-gray-900 text-base font-medium leading-6">
          Car Details
        </h3>
        <div className="flex flex-col">
          <span className="text-gray-600 text-sm font-normal leading-5">
            Car Model
          </span>
          <span className="text-gray-900 text-sm font-medium leading-5">
            {driver.carName}
          </span>
        </div>
      </div>

      {/* Actions */}
      {status === "pending" ? (
        <div className="w-full flex flex-col sm:flex-row gap-4 mt-2">
          <button
            onClick={() => handleStatusChange("approved")}
            className="flex-1 py-3 bg-green-600 hover:bg-green-700 text-white rounded-[10px] text-base font-medium transition-colors shadow-sm flex items-center justify-center"
          >
            Approve Driver
          </button>
          <button
            onClick={() => handleStatusChange("rejected")}
            className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white rounded-[10px] text-base font-medium transition-colors shadow-sm flex items-center justify-center"
          >
            Reject Driver
          </button>
        </div>
      ) : (
        <div className="w-full flex justify-center mt-2">
          <div
            className={`w-full sm:w-auto px-16 py-3 rounded-[10px] text-center text-base font-medium capitalize text-white shadow-sm ${status === "approved" ? "bg-green-600" : "bg-red-600"}`}
          >
            Status: {status}
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default DriverDetailsModal;
