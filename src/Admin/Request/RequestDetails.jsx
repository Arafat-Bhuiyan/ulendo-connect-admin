import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import requests from "../../../public/requestsInfo.json";

export default function RequestDetailsCard() {
  const { id } = useParams();
  const request = requests.find((r) => r.id === id);
  const navigate = useNavigate();

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

  if (!request) return <div className="p-10">Request not found</div>;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="relative h-[808px] w-[512px] rounded-xl bg-white p-[25px] shadow-[0px_4px_6px_-4px_rgba(0,0,0,0.10)] outline outline-1 outline-offset-[-1px] outline-gray-200">
        {/* Header */}
        <div className="w-full flex flex-col gap-2 mb-6">
          <h2 className="text-gray-900 text-xl font-semibold leading-7">
            Request Details #{request.id}
          </h2>
          <p className="text-gray-600 text-sm leading-5">
            Complete information about this request
          </p>
        </div>

        <div className="flex flex-col gap-6 h-[671px] overflow-y-auto pr-1">
          {/* Status + Time */}
          <div className="flex justify-between items-center">
            <span
              className={`rounded-[10px] px-3 py-1 text-sm font-medium ${getStatusColor(
                request.status
              )}`}
            >
              {request.status}
            </span>
            <span className="text-gray-600 text-sm">{request.time}</span>
          </div>

          <div className="h-px bg-gray-200" />

          {/* Customer Information */}
          <div className="flex flex-col gap-3">
            <h3 className="text-gray-900 text-base font-normal">
              Customer Information
            </h3>
            <div className="bg-gray-50 rounded-xl p-4 flex flex-col gap-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Name:</span>
                <span className="text-gray-900">{request.customer}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Phone:</span>
                <span className="text-gray-900">{request.customer_phone}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Email:</span>
                <span className="text-gray-900">{request.customer_email}</span>
              </div>
            </div>
          </div>

          {/* Driver Information */}
          <div className="flex flex-col gap-3">
            <h3 className="text-gray-900 text-base font-normal">
              Driver Information
            </h3>
            <div className="bg-gray-50 rounded-xl p-4 flex flex-col gap-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Driver Name:</span>
                <span className="text-gray-900">{request.driver}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Driver Phone:</span>
                <span className="text-gray-900">{request.driver_phone}</span>
              </div>
            </div>
          </div>

          {/* Delivery Location */}
          <div className="flex flex-col gap-3">
            <h3 className="text-gray-900 text-base font-normal">
              Delivery Location
            </h3>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-gray-900 text-sm leading-5">
                {request.location}
              </p>
            </div>
          </div>

          {/* Order Details */}
          <div className="flex flex-col gap-3">
            <h3 className="text-gray-900 text-base font-normal">
              Order Details
            </h3>
            <div className="bg-gray-50 rounded-xl p-4 flex flex-col gap-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Items:</span>
                <span className="text-gray-900">{request.order_details.items}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Total Amount:</span>
                <span className="text-gray-900">{request.order_details.total_amount}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Payment Method:</span>
                <span className="text-gray-900">{request.order_details.payment_method}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Close Icon */}
        <button
          onClick={() => navigate(-1)}
          className="absolute right-[17px] top-[17px] text-sm text-gray-900 opacity-70"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
