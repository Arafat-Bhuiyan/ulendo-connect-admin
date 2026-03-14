import React from 'react';
import { X, Tag, Copy } from 'lucide-react';

const PromoDetailsModal = ({ isOpen, onClose, promo, onExpire, onDisable, onCopy }) => {
  if (!isOpen || !promo) return null;

  const usagePercent = Math.min(100, Math.round((promo.usageCurrent / promo.usageLimit) * 100));

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 overflow-y-auto">
      <div className="relative w-full max-w-[672px] bg-white rounded-[10px] flex flex-col items-start font-sans shadow-xl mt-auto mb-auto">
        <div className="w-full h-20 px-6 pt-6 pb-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-gray-900 text-xl font-bold font-['Inter'] leading-7">Promo Code Details</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="w-full px-6 py-6 flex flex-col gap-9">
          {/* Promo Highlight */}
          <div className="w-full h-20 px-4 bg-blue-50 rounded-[10px] flex justify-between items-center">
            <div className="flex justify-start items-center gap-3">
              <div className="w-12 h-12 bg-blue-600 rounded-[10px] flex justify-center items-center text-white">
                <Tag className="w-6 h-6" />
              </div>
              <div className="flex flex-col justify-start items-start">
                <span className="text-blue-600 text-sm font-normal font-['Inter'] leading-5">Promo Code</span>
                <span className="text-blue-900 text-2xl font-bold font-['Consolas'] leading-8 uppercase">{promo.code}</span>
              </div>
            </div>
            <button 
              onClick={() => onCopy(promo.code)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 transition-colors rounded-[10px] flex items-center gap-2 text-white"
            >
              <Copy className="w-4 h-4" />
              <span className="text-base font-medium font-['Inter'] leading-6">Copy Code</span>
            </button>
          </div>
          
          {/* Details Grid */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
            <div className="flex flex-col gap-1">
              <span className="text-gray-600 text-sm font-normal font-['Inter'] leading-5">Description</span>
              <span className="text-gray-900 text-sm font-medium font-['Inter'] leading-5">{promo.description}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-gray-600 text-sm font-normal font-['Inter'] leading-5">Status</span>
              <div className="flex items-start mt-1">
                <span className={`px-2 py-0.5 rounded-full text-xs font-normal lowercase tracking-wide ${
                  promo.status === 'active' 
                    ? 'bg-green-100 text-green-700' 
                    : promo.status === 'disabled'
                    ? 'bg-gray-100 text-gray-700'
                    : promo.status === 'expired'
                    ? 'bg-red-100 text-red-700'
                    : 'bg-gray-100 text-gray-700'
                }`}>
                  {promo.status}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-gray-600 text-sm font-normal font-['Inter'] leading-5">Discount</span>
              <span className="text-gray-900 text-sm font-medium font-['Inter'] leading-5">{promo.discount} off</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-gray-600 text-sm font-normal font-['Inter'] leading-5">Minimum Amount</span>
              <span className="text-gray-900 text-sm font-medium font-['Inter'] leading-5">No minimum</span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-gray-600 text-sm font-normal font-['Inter'] leading-5">Usage</span>
              <span className="text-gray-900 text-sm font-medium font-['Inter'] leading-5">{promo.usageCurrent} / {promo.usageLimit} used</span>
              <div className="w-full h-2 mt-1 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full" style={{ width: `${usagePercent}%` }} />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-gray-600 text-sm font-normal font-['Inter'] leading-5">Usage Rate</span>
              <span className="text-gray-900 text-sm font-medium font-['Inter'] leading-5">{usagePercent.toFixed(1)}%</span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-gray-600 text-sm font-normal font-['Inter'] leading-5">Valid From</span>
              <span className="text-gray-900 text-sm font-medium font-['Inter'] leading-5">{promo.startDate}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-gray-600 text-sm font-normal font-['Inter'] leading-5">Valid Until</span>
              <span className="text-gray-900 text-sm font-medium font-['Inter'] leading-5">{promo.endDate}</span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-gray-600 text-sm font-normal font-['Inter'] leading-5">Created Date</span>
              <span className="text-gray-900 text-sm font-medium font-['Inter'] leading-5">{promo.startDate}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-gray-600 text-sm font-normal font-['Inter'] leading-5">Promo ID</span>
              <span className="text-gray-900 text-sm font-medium font-['Inter'] leading-5">PROMO00{promo.id}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="w-full pt-4 flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => {
                onExpire(promo.id);
                onClose();
              }}
              className="flex-1 py-3 bg-[#ea580c] hover:bg-[#c2410c] transition-colors rounded-[10px] text-white text-base font-medium font-['Inter']"
            >
              Expired Code
            </button>
            <button 
              onClick={() => {
                onDisable(promo.id);
                onClose();
              }}
              className="flex-1 py-3 bg-[#dc2626] hover:bg-[#b91c1c] transition-colors rounded-[10px] text-white text-base font-medium font-['Inter']"
            >
              Disabled Code
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoDetailsModal;
