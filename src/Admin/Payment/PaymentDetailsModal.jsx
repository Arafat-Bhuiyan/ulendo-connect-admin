import React from 'react';
import { X } from 'lucide-react';

const PaymentDetailsModal = ({ isOpen, onClose, payment, onConfirm, onReject }) => {
  if (!isOpen || !payment) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-[496px] bg-white rounded-[10px] shadow-2xl relative overflow-hidden animate-in fade-in zoom-in duration-200 font-['Inter'] flex flex-col">
        {/* Header */}
        <div className="px-6 py-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-gray-900 text-xl font-bold leading-7">Transaction Details</h2>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 flex flex-col gap-6">
          {/* Info Grid */}
          <div className="flex flex-col gap-6">
            <div className="flex">
              <div className="flex flex-col gap-1 w-[65%]">
                <span className="text-gray-600 text-sm font-normal leading-5">Payment ID</span>
                <span className="text-gray-900 text-sm font-medium leading-5">{payment.id}</span>
              </div>
              <div className="flex flex-col gap-1 w-[35%]">
                <span className="text-gray-600 text-sm font-normal leading-5">Date</span>
                <span className="text-gray-900 text-sm font-medium leading-5">{payment.date}</span>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex flex-col gap-1 w-[65%]">
                <span className="text-gray-600 text-sm font-normal leading-5">Ride ID</span>
                <span className="text-gray-900 text-sm font-medium leading-5">{payment.rideId}</span>
              </div>
              <div className="flex flex-col gap-1 w-[35%]">
                <span className="text-gray-600 text-sm font-normal leading-5">Status</span>
                <div className="flex mt-0.5">
                  <span className={`px-2 py-1 inline-flex items-center text-xs font-normal rounded-full capitalize leading-4 ${
                    payment.status === 'approved' || payment.status === 'paid' ? 'bg-blue-100 text-blue-700' :
                    payment.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {payment.status}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex">
              <div className="flex flex-col gap-1 w-[65%]">
                <span className="text-gray-600 text-sm font-normal leading-5">Passenger</span>
                <span className="text-gray-900 text-sm font-medium leading-5">{payment.passenger}</span>
              </div>
              <div className="flex flex-col gap-1 w-[35%]">
                <span className="text-gray-600 text-sm font-normal leading-5">Driver</span>
                <span className="text-gray-900 text-sm font-medium leading-5">{payment.driver}</span>
              </div>
            </div>
          </div>

          {/* Payment Breakdown */}
          <div className="flex flex-col gap-5 mt-2">
            <h3 className="text-gray-900 text-lg font-semibold leading-7">Payment Breakdown</h3>
            
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center text-base">
                <span className="text-gray-700 font-normal">Total Payment Amount</span>
                <span className="text-gray-900 font-medium">{payment.amount}</span>
              </div>
              <div className="flex justify-between items-center text-base">
                <span className="text-gray-700 font-normal">Platform Commission ({payment.commissionRate})</span>
                <span className="text-gray-900 font-medium">-{payment.commission}</span>
              </div>
              <div className="flex justify-between items-center text-base pt-3 border-t border-gray-200">
                <span className="text-gray-900 font-semibold">Driver Earnings</span>
                <span className="text-green-600 font-semibold">{payment.earnings}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          {payment.status === 'pending' && (
            <div className="flex items-center gap-4 mt-2 w-full">
              <button
                onClick={() => { onConfirm(payment.id); onClose(); }}
                className="flex-1 h-12 bg-green-600 hover:bg-green-700 text-white rounded-[10px] flex items-center justify-center text-base font-medium transition-colors"
              >
                Confirm Payment
              </button>
              <button
                onClick={() => { onReject(payment.id); onClose(); }}
                className="flex-1 h-12 bg-red-600 hover:bg-red-700 text-white rounded-[10px] flex items-center justify-center text-base font-medium transition-colors"
              >
                Reject Payment
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentDetailsModal;
