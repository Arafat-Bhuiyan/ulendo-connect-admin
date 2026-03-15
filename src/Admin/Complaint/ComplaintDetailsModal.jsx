import React from 'react';
import { X, Send, CheckCircle } from 'lucide-react';

const ComplaintDetailsModal = ({ isOpen, onClose, complaint, onResolve, onReply }) => {
  if (!isOpen || !complaint) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-[552px] bg-white rounded-[10px] shadow-2xl relative overflow-hidden animate-in fade-in zoom-in duration-200 font-['Inter'] flex flex-col">
        {/* Header */}
        <div className="px-6 py-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-gray-900 text-xl font-bold leading-7">Complaint Details</h2>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 flex flex-col gap-6 overflow-y-auto max-h-[85vh]">
          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-y-6">
            <div className="flex flex-col gap-1">
              <span className="text-gray-600 text-sm font-normal leading-5">Complaint ID</span>
              <span className="text-gray-900 text-sm font-medium leading-5">{complaint.id}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-gray-600 text-sm font-normal leading-5">Date Submitted</span>
              <span className="text-gray-900 text-sm font-medium leading-5">{complaint.date}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-gray-600 text-sm font-normal leading-5">User Name</span>
              <span className="text-gray-900 text-sm font-medium leading-5">{complaint.name}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-gray-600 text-sm font-normal leading-5">User Role</span>
              <div className="flex">
                <span className={`px-2 py-1 text-xs font-normal rounded-full capitalize leading-4 ${
                  complaint.role === 'passenger' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                }`}>
                  {complaint.role}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-gray-600 text-sm font-normal leading-5">Complaint Type</span>
              <span className="text-gray-900 text-sm font-medium leading-5">Driver Behavior</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-gray-600 text-sm font-normal leading-5">Status</span>
              <div className="flex">
                <span className={`px-2.5 py-1 text-xs font-normal rounded-full capitalize leading-4 ${
                  complaint.status === 'resolved' ? 'bg-green-100 text-green-700' :
                  complaint.status === 'in review' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {complaint.status}
                </span>
              </div>
            </div>
          </div>

          {/* Message Area */}
          <div className="flex flex-col gap-2">
            <span className="text-gray-600 text-sm font-normal leading-5">Complaint Message</span>
            <div className="p-4 bg-gray-50 rounded-[10px]">
              <p className="text-gray-900 text-base font-normal leading-6">
                {complaint.message}
              </p>
            </div>
          </div>

          {/* Admin Response Area */}
          <div className="flex flex-col gap-2">
            <span className="text-gray-700 text-sm font-medium leading-5">Admin Response</span>
            <textarea 
              className="w-full p-4 h-28 bg-white border border-gray-300 rounded-[10px] text-gray-900 text-base font-normal focus:outline-none focus:border-blue-500 placeholder:text-neutral-950/50 resize-none transition-all"
              placeholder="Type your response to the complaint..."
            ></textarea>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 mt-2">
            <button 
              onClick={() => { onReply(complaint.id); onClose(); }}
              className="flex-1 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-[10px] flex items-center justify-center gap-2 text-base font-medium transition-colors active:scale-[0.98]"
            >
              <Send size={18} />
              Send Reply
            </button>
            <button 
              onClick={() => { onResolve(complaint.id); onClose(); }}
              className="flex-1 h-12 bg-green-600 hover:bg-green-700 text-white rounded-[10px] flex items-center justify-center gap-2 text-base font-medium transition-colors active:scale-[0.98]"
            >
              <CheckCircle size={18} />
              Mark as Resolved
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplaintDetailsModal;
