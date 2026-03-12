import React, { useState } from "react";
import { X, Send } from "lucide-react";

const EmailModal = ({ isOpen, onClose, user, onSend }) => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSend({
      to: user.email,
      subject,
      message,
    });
    setSubject("");
    setMessage("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-[529px] bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-gray-900 text-xl font-bold inter-font">Send Email</h2>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-gray-700 text-sm font-medium inter-font">To:</label>
            <input
              type="email"
              value={user?.email || ""}
              disabled
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-600 inter-font text-sm"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-gray-700 text-sm font-medium inter-font">Subject:</label>
            <input
              type="text"
              placeholder="Enter subject"
              required
              className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 inter-font text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-gray-700 text-sm font-medium inter-font">Message:</label>
            <textarea
              placeholder="Enter your message"
              required
              rows={6}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 inter-font text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          {/* Footer */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 font-semibold transition-all active:scale-[0.98]"
            >
              <Send size={18} />
              Send Email
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 h-12 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition-all active:scale-[0.98]"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmailModal;
