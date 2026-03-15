import React, { useState, useRef, useEffect } from 'react';
import { X, Mail, UserX, AlertCircle, ChevronDown } from 'lucide-react';

const DriverDetailsModal = ({ isOpen, onClose, driver, onSuspend, onRemind, onStatusChange }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isDropdownOpen]);
  if (!isOpen || !driver) return null;

  const hasPending = driver.status === 'pending' || (typeof driver.pending === 'string' && driver.pending !== '$0.00' && driver.pending !== '$0');
  const lastPaymentDate = driver.lastPaymentDate || "2026-03-05";

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-[500px] bg-white rounded-2xl shadow-2xl relative overflow-hidden animate-in fade-in zoom-in duration-200 font-['Inter']">
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 p-1 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
        >
          <X size={20} />
        </button>

        <div className="px-8 pt-8 pb-8 flex flex-col gap-8">
          {/* Driver Info Grid */}
          <div className="flex flex-col gap-6 w-full">
            <div className="flex w-full">
              <div className="flex flex-col gap-1 w-[45%]">
                <span className="text-gray-600 text-sm font-normal leading-5">Driver Name</span>
                <span className="text-gray-900 text-sm font-medium leading-5">{driver.name}</span>
              </div>
              <div className="flex flex-col gap-1 w-[55%]">
                <span className="text-gray-600 text-sm font-normal leading-5">Email</span>
                <span className="text-gray-900 text-sm font-medium leading-5">{driver.email}</span>
              </div>
            </div>

            <div className="flex w-full">
              <div className="flex flex-col gap-1 w-[45%]">
                <span className="text-gray-600 text-sm font-normal leading-5">Total Trips</span>
                <span className="text-gray-900 text-sm font-medium leading-5">{driver.trips}</span>
              </div>
              <div className="flex flex-col gap-1 w-[55%]">
                <span className="text-gray-600 text-sm font-normal leading-5">Total Earnings</span>
                <span className="text-gray-900 text-sm font-medium leading-5">{driver.earnings}</span>
              </div>
            </div>

            <div className="flex w-full">
              <div className="flex flex-col gap-1 w-[45%]">
                <span className="text-gray-600 text-sm font-normal leading-5">Platform Charge (20%)</span>
                <span className="text-gray-900 text-sm font-medium leading-5">{driver.charge}</span>
              </div>
              <div className="flex flex-col gap-1 w-[55%]">
                <span className="text-gray-600 text-sm font-normal leading-5">Status</span>
                <div className="relative mt-0.5" ref={dropdownRef}>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className={`px-2 py-0.5 inline-flex items-center gap-1 text-[11px] font-medium rounded-full capitalize leading-tight focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500/30 transition-all ${
                      driver.status === 'paid' ? 'bg-green-100 text-green-700 hover:bg-green-200' :
                      driver.status === 'pending' ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200' :
                      'bg-red-100 text-red-700 hover:bg-red-200'
                    }`}
                  >
                    {driver.status}
                    <ChevronDown size={12} className={driver.status === 'paid' ? 'text-green-600' : driver.status === 'pending' ? 'text-yellow-600' : 'text-red-700'} />
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute top-full left-0 mt-1 w-[120px] bg-white border border-gray-100 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] z-50 overflow-hidden py-1.5 animate-in fade-in zoom-in-95 duration-100 origin-top-left">
                      {['paid', 'pending', 'suspend'].map((status) => (
                        <button
                          key={status}
                          onClick={() => {
                            if (onStatusChange) onStatusChange(driver.id, status);
                            setIsDropdownOpen(false);
                          }}
                          className={`w-full text-left px-3 py-2 text-xs font-medium capitalize transition-colors flex items-center gap-2 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none ${
                            driver.status === status ? 'bg-gray-50' : ''
                          } ${
                            status === 'paid' ? 'text-green-700' :
                            status === 'pending' ? 'text-yellow-700' :
                            'text-red-700'
                          }`}
                        >
                          <div className={`w-1.5 h-1.5 rounded-full ${
                            status === 'paid' ? 'bg-green-500' :
                            status === 'pending' ? 'bg-yellow-500' :
                            'bg-red-500'
                          }`} />
                          {status}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Payment Breakdown */}
          <div className="flex flex-col gap-5">
            <h3 className="text-gray-900 text-lg font-semibold leading-7">Payment Breakdown</h3>
            
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center text-base">
                <span className="text-gray-700 font-normal">Platform Charge Paid</span>
                <span className="text-green-600 font-medium">{driver.paid}</span>
              </div>
              <div className="flex justify-between items-center text-base">
                <span className="text-gray-700 font-normal">Platform Charge Pending</span>
                <span className="text-red-600 font-medium">{driver.pending}</span>
              </div>
              <div className="flex justify-between items-center text-base">
                <span className="text-gray-700 font-normal">Last Payment Date</span>
                <span className="text-gray-900 font-medium">{lastPaymentDate}</span>
              </div>
            </div>
          </div>

          {/* Alert & Actions block */}
          <div className="flex flex-col gap-5 mt-2">
            {(hasPending && driver.status !== 'suspend') && (
              <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-[10px] border border-orange-200">
                <AlertCircle className="text-[rgb(234,88,12)] mt-0.5 min-w-5 min-h-5" size={20} />
                <div className="flex flex-col gap-1">
                  <span className="text-orange-900 text-sm font-medium leading-5">Pending Payment Alert</span>
                  <span className="text-[rgb(194,65,12)] text-sm font-normal leading-5">This driver has {driver.pending} in pending platform charges.</span>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center gap-3 w-full">
              <button
                onClick={() => { onClose(); onRemind(driver); }}
                className="flex-1 h-12 bg-[#ea580c] hover:bg-orange-700 text-white rounded-[10px] flex items-center justify-center gap-2 text-sm font-medium transition-colors"
              >
                <Mail size={16} />
                Send Payment Reminder
              </button>
              <button
                onClick={() => { onClose(); onSuspend(driver.id); }}
                disabled={driver.status === 'suspend'}
                className={`flex-1 h-12 rounded-[10px] flex items-center justify-center gap-2 text-sm font-medium transition-colors ${
                  driver.status === 'suspend'
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-[#dc2626] hover:bg-red-700 text-white'
                }`}
              >
                <UserX size={16} />
                {driver.status === 'suspend' ? 'Suspended' : 'Suspend Driver'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverDetailsModal;
