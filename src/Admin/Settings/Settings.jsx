import React, { useState } from 'react';
import { Upload, Save } from 'lucide-react';

const Settings = () => {
  const [formData, setFormData] = useState({
    appName: 'RideShare App',
    contactEmail: 'support@rideshare.com',
    supportPhone: '+1-800-RIDESHARE',
    privacyPolicy: '',
    termsConditions: '',
  });

  const [notifications, setNotifications] = useState({
    newDriver: false,
    newComplaint: false,
    dailySummary: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggleNotification = (key) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="w-full flex-1 mx-auto p-4 md:p-6 flex flex-col gap-6 font-['Inter'] bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col gap-1">
        <h1 className="text-gray-900 text-xl font-bold leading-7">Settings</h1>
        <p className="text-gray-600 text-sm font-normal leading-5">Manage application settings and configurations</p>
      </div>

      {/* App Configuration */}
      <div className="bg-white rounded-lg border border-gray-200 p-5 flex flex-col gap-5">
        <h2 className="text-gray-900 text-base font-semibold leading-6">App Configuration</h2>
        
        <div className="flex flex-col gap-5">
          {/* App Name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-gray-700 text-xs font-medium leading-4">App Name</label>
            <input
              type="text"
              name="appName"
              value={formData.appName}
              onChange={handleInputChange}
              className="w-full h-9 px-3.5 py-1.5 rounded-lg border border-gray-300 text-neutral-950 text-sm font-normal focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>

          {/* App Logo */}
          <div className="flex flex-col gap-1.5">
            <label className="text-gray-700 text-xs font-medium leading-4">App Logo</label>
            <div className="flex items-center gap-3.5">
              <div className="w-16 h-16 bg-gray-100 rounded-lg border border-gray-300 flex items-center justify-center">
                <span className="text-gray-400 text-xl font-bold">RS</span>
              </div>
              <button className="flex items-center gap-2 px-4 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors border border-transparent">
                <Upload size={16} />
                Upload Logo
              </button>
            </div>
            <p className="text-gray-500 text-xs font-normal">Recommended size: 512×512px, PNG or JPG</p>
          </div>

          {/* Contact Email */}
          <div className="flex flex-col gap-1.5">
            <label className="text-gray-700 text-xs font-medium leading-4">Contact Email</label>
            <input
              type="email"
              name="contactEmail"
              value={formData.contactEmail}
              onChange={handleInputChange}
              className="w-full h-9 px-3.5 py-1.5 rounded-lg border border-gray-300 text-neutral-950 text-sm font-normal focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>

          {/* Support Phone Number */}
          <div className="flex flex-col gap-1.5">
            <label className="text-gray-700 text-xs font-medium leading-4">Support Phone Number</label>
            <input
              type="text"
              name="supportPhone"
              value={formData.supportPhone}
              onChange={handleInputChange}
              className="w-full h-9 px-3.5 py-1.5 rounded-lg border border-gray-300 text-neutral-950 text-sm font-normal focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Legal Documents */}
      <div className="bg-white rounded-lg border border-gray-200 p-5 flex flex-col gap-5">
        <h2 className="text-gray-900 text-base font-semibold leading-6">Legal Documents</h2>
        
        <div className="flex flex-col gap-5">
          {/* Privacy Policy */}
          <div className="flex flex-col gap-1.5">
            <label className="text-gray-700 text-xs font-medium leading-4">Privacy Policy</label>
            <textarea
              name="privacyPolicy"
              value={formData.privacyPolicy}
              onChange={handleInputChange}
              className="w-full h-44 p-3.5 rounded-lg border border-gray-300 text-neutral-950 text-sm font-normal focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
              placeholder="Enter Privacy Policy content here..."
            />
          </div>

          {/* Terms and Conditions */}
          <div className="flex flex-col gap-1.5">
            <label className="text-gray-700 text-xs font-medium leading-4">Terms and Conditions</label>
            <textarea
              name="termsConditions"
              value={formData.termsConditions}
              onChange={handleInputChange}
              className="w-full h-44 p-3.5 rounded-lg border border-gray-300 text-neutral-950 text-sm font-normal focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
              placeholder="Enter Terms and Conditions content here..."
            />
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-white rounded-lg border border-gray-200 p-5 flex flex-col gap-5">
        <h2 className="text-gray-900 text-base font-semibold leading-6">Notification Settings</h2>
        
        <div className="flex flex-col gap-4">
          {/* New Driver */}
          <div className="flex items-start gap-3">
            <div 
              onClick={() => handleToggleNotification('newDriver')}
              className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center cursor-pointer transition-colors ${
                notifications.newDriver ? 'bg-blue-600 border-blue-600' : 'bg-white border-gray-400'
              }`}
            >
              {notifications.newDriver && <div className="w-2 h-2 bg-white rounded-sm" />}
            </div>
            <div className="flex flex-col">
              <span className="text-gray-900 text-xs font-medium leading-4">Email notifications for new driver registrations</span>
              <span className="text-gray-500 text-[10px] font-medium leading-3">Receive an email when a new driver submits their documents</span>
            </div>
          </div>

          {/* New Complaint */}
          <div className="flex items-start gap-3">
            <div 
              onClick={() => handleToggleNotification('newComplaint')}
              className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center cursor-pointer transition-colors ${
                notifications.newComplaint ? 'bg-blue-600 border-blue-600' : 'bg-white border-gray-400'
              }`}
            >
              {notifications.newComplaint && <div className="w-2 h-2 bg-white rounded-sm" />}
            </div>
            <div className="flex flex-col">
              <span className="text-gray-900 text-xs font-medium leading-4">Email notifications for new complaints</span>
              <span className="text-gray-500 text-[10px] font-medium leading-3">Receive an email when a user submits a complaint</span>
            </div>
          </div>

          {/* Daily Summary */}
          <div className="flex items-start gap-3">
            <div 
              onClick={() => handleToggleNotification('dailySummary')}
              className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center cursor-pointer transition-colors ${
                notifications.dailySummary ? 'bg-blue-600 border-blue-600' : 'bg-white border-gray-400'
              }`}
            >
              {notifications.dailySummary && <div className="w-2 h-2 bg-white rounded-sm" />}
            </div>
            <div className="flex flex-col">
              <span className="text-gray-900 text-xs font-medium leading-4">Daily summary reports</span>
              <span className="text-gray-500 text-[10px] font-medium leading-3">Receive a daily email with platform statistics</span>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end pt-2 pb-6">
        <button className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-all shadow-sm active:scale-95">
          <Save size={18} />
          Save All Settings
        </button>
      </div>
    </div>
  );
};

export default Settings;