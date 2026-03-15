import React, { useState } from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  Percent, 
  AlertCircle, 
  UserX, 
  Eye, 
  Mail
} from 'lucide-react';
import EmailModal from '@/Admin/User/EmailModal';
import DriverDetailsModal from './DriverDetailsModal';

const Rate = () => {
  const [activeTab, setActiveTab] = useState('All');
  
  // Email Modal State
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [selectedUserForEmail, setSelectedUserForEmail] = useState(null);

  // Details Modal State
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState(null);

  // Platform settings state
  const [isEditingSettings, setIsEditingSettings] = useState(false);
  const [perKmRate, setPerKmRate] = useState(1.5);
  const [serviceCharge, setServiceCharge] = useState(20);
  
  // Temporary edit states
  const [tempPerKmRate, setTempPerKmRate] = useState(1.5);
  const [tempServiceCharge, setTempServiceCharge] = useState(20);

  const handleEditClick = () => {
    setTempPerKmRate(perKmRate);
    setTempServiceCharge(serviceCharge);
    setIsEditingSettings(true);
  };

  const handleSaveClick = () => {
    setPerKmRate(tempPerKmRate);
    setServiceCharge(tempServiceCharge);
    setIsEditingSettings(false);
  };

  const handleCancelClick = () => {
    setIsEditingSettings(false);
  };

  const tabs = ['All', 'Paid', 'Pending', 'Suspend'];

  const [data, setData] = useState([
    {
      id: 1,
      name: 'John Parker',
      email: 'john.parker@email.com',
      trips: 150,
      earnings: '$5000.00',
      charge: '$1000.00',
      paid: '$500.00',
      pending: '$500.00',
      status: 'paid',
    },
    {
      id: 2,
      name: 'Maria Garcia',
      email: 'maria.garcia@email.com',
      trips: 200,
      earnings: '$7000.00',
      charge: '$1400.00',
      paid: '$1000.00',
      pending: '$400.00',
      status: 'pending',
    },
    {
      id: 3,
      name: 'Kevin Lee',
      email: 'kevin.lee@email.com',
      trips: 100,
      earnings: '$3000.00',
      charge: '$600.00',
      paid: '$300.00',
      pending: '$300.00',
      status: 'suspend',
    },
    {
      id: 4,
      name: 'Sophie Turner',
      email: 'sophie.turner@email.com',
      trips: 50,
      earnings: '$1500.00',
      charge: '$300.00',
      paid: '$150.00',
      pending: '$150.00',
      status: 'paid',
    }
  ]);

  const handleSuspend = (id) => {
    setData((prevData) =>
      prevData.map((row) =>
        row.id === id && row.status !== 'suspend'
          ? { ...row, status: 'suspend' }
          : row
      )
    );
    if (selectedDriver && selectedDriver.id === id) {
      setSelectedDriver(prev => ({ ...prev, status: 'suspend' }));
    }
  };

  const handleStatusChange = (id, newStatus) => {
    setData((prevData) =>
      prevData.map((row) =>
        row.id === id ? { ...row, status: newStatus } : row
      )
    );
    setSelectedDriver((prev) => (prev && prev.id === id ? { ...prev, status: newStatus } : prev));
  };

  const filteredData = data.filter((row) => {
    if (activeTab === 'All') return true;
    return row.status.toLowerCase() === activeTab.toLowerCase();
  });

  const handleEmailClick = (user) => {
    setSelectedUserForEmail(user);
    setIsEmailModalOpen(true);
  };

  const handleViewDetailsClick = (driver) => {
    setSelectedDriver(driver);
    setIsDetailsModalOpen(true);
  };

  const handleSendEmail = (emailData) => {
    console.log('Sending email:', emailData);
    // Add real API integration here if needed later
    setIsEmailModalOpen(false);
  };

  return (
    <div className="w-full flex-1 mx-auto p-4 md:p-6 flex flex-col gap-6 font-['Inter'] bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col gap-1">
        <h1 className="text-gray-900 text-xl font-bold leading-7">Rate & Commission Management</h1>
        <p className="text-gray-600 text-sm font-normal leading-5">Manage platform rates, service charges, and driver earnings</p>
      </div>

      {/* Platform Settings */}
      <div className="bg-white rounded-lg border border-gray-200 p-5 flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <h2 className="text-gray-900 text-base font-semibold leading-6">Platform Settings</h2>
          {!isEditingSettings ? (
            <button 
              onClick={handleEditClick}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 transition-colors rounded-lg flex justify-center items-center gap-2"
            >
              <span className="text-white text-sm font-medium leading-5">Edit Settings</span>
            </button>
          ) : (
            <div className="flex justify-start items-start gap-1.5">
              <button 
                onClick={handleSaveClick}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 transition-colors rounded-lg flex justify-center items-center gap-2"
              >
                <span className="text-white text-sm font-medium leading-5">Save Changes</span>
              </button>
              <button 
                onClick={handleCancelClick}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 transition-colors rounded-lg flex justify-center items-center gap-2"
              >
                <span className="text-gray-700 text-sm font-medium leading-5">Cancel</span>
              </button>
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="px-5 py-5 bg-blue-50 rounded-lg border border-blue-200 flex flex-col gap-2.5">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 flex justify-center items-center bg-blue-600 rounded-lg text-white">
                <DollarSign size={20} />
              </div>
              <div className="flex flex-col gap-[3.39px]">
                <span className="text-blue-600 text-xs font-normal leading-4">Per Kilometer Rate</span>
                {!isEditingSettings ? (
                  <span className="text-blue-900 text-xl font-bold leading-7">${Number(perKmRate).toFixed(2)}/km</span>
                ) : (
                  <input
                    type="number"
                    step="0.01"
                    value={tempPerKmRate}
                    onChange={(e) => setTempPerKmRate(Number(e.target.value))}
                    className="w-28 h-9 px-1.5 py-[3.39px] bg-white rounded outline outline-[0.85px] outline-blue-300 text-blue-900 text-xl font-bold leading-7"
                    autoFocus
                  />
                )}
              </div>
            </div>
            <p className="text-blue-700 text-xs font-normal leading-4">Base rate charged per kilometer of travel</p>
          </div>

          <div className="px-5 py-5 bg-purple-50 rounded-lg border border-purple-200 flex flex-col gap-2.5">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 flex justify-center items-center bg-purple-600 rounded-lg text-white">
                <Percent size={20} />
              </div>
              <div className="flex flex-col gap-[3.39px]">
                <span className="text-purple-600 text-xs font-normal leading-4">Platform Service Charge</span>
                {!isEditingSettings ? (
                  <span className="text-purple-900 text-xl font-bold leading-7">{serviceCharge}%</span>
                ) : (
                  <input
                    type="number"
                    value={tempServiceCharge}
                    onChange={(e) => setTempServiceCharge(Number(e.target.value))}
                    className="w-20 h-9 px-1.5 py-[3.39px] bg-white rounded outline outline-[0.85px] outline-purple-300 text-purple-900 text-xl font-bold leading-7"
                  />
                )}
              </div>
            </div>
            <p className="text-purple-700 text-xs font-normal leading-4">Percentage charged on each ride as commission</p>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Total Trips */}
        <div className="bg-white rounded-lg border border-gray-200 p-5 flex justify-between items-center">
          <div className="flex flex-col gap-1">
            <span className="text-gray-600 text-xs font-normal leading-4">Total Trips</span>
            <span className="text-gray-900 text-xl font-bold leading-7">500</span>
          </div>
          <div className="w-10 h-10 flex justify-center items-center bg-blue-50 rounded-lg text-blue-600">
            <TrendingUp size={20} />
          </div>
        </div>
        
        {/* Driver Earnings */}
        <div className="bg-white rounded-lg border border-gray-200 p-5 flex justify-between items-center">
          <div className="flex flex-col gap-1">
            <span className="text-gray-600 text-xs font-normal leading-4">Driver Earnings</span>
            <span className="text-gray-900 text-xl font-bold leading-7">$16,500</span>
          </div>
          <div className="w-10 h-10 flex justify-center items-center bg-green-50 rounded-lg text-green-600">
            <DollarSign size={20} />
          </div>
        </div>

        {/* Platform Charges */}
        <div className="bg-white rounded-lg border border-gray-200 p-5 flex justify-between items-center">
          <div className="flex flex-col gap-1">
            <span className="text-gray-600 text-xs font-normal leading-4">Platform Charges</span>
            <span className="text-gray-900 text-xl font-bold leading-7">$3,300</span>
          </div>
          <div className="w-10 h-10 flex justify-center items-center bg-purple-50 rounded-lg text-purple-600">
            <Percent size={20} />
          </div>
        </div>

        {/* Pending Charges */}
        <div className="bg-white rounded-lg border border-gray-200 p-5 flex justify-between items-center">
          <div className="flex flex-col gap-1">
            <span className="text-gray-600 text-xs font-normal leading-4">Pending Charges</span>
            <span className="text-red-600 text-xl font-bold leading-7">$1,350</span>
          </div>
          <div className="w-10 h-10 flex justify-center items-center bg-red-50 rounded-lg text-red-600">
            <AlertCircle size={20} />
          </div>
        </div>

        {/* Pending Drivers */}
        <div className="bg-white rounded-lg border border-gray-200 p-5 flex justify-between items-center">
          <div className="flex flex-col gap-1">
            <span className="text-gray-600 text-xs font-normal leading-4">Pending Drivers</span>
            <span className="text-orange-600 text-xl font-bold leading-7">4</span>
          </div>
          <div className="w-10 h-10 flex justify-center items-center bg-orange-50 rounded-lg text-orange-600">
            <UserX size={20} />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-gray-900 text-base font-semibold leading-6">Driver Platform Charges</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-5 py-3 text-gray-500 text-[10px] font-semibold uppercase tracking-wide">Driver</th>
                <th className="px-5 py-3 text-gray-500 text-[10px] font-semibold uppercase tracking-wide">Total Trips</th>
                <th className="px-5 py-3 text-gray-500 text-[10px] font-semibold uppercase tracking-wide">Total Earnings</th>
                <th className="px-5 py-3 text-gray-500 text-[10px] font-semibold uppercase tracking-wide">Platform Charge</th>
                <th className="px-5 py-3 text-gray-500 text-[10px] font-semibold uppercase tracking-wide">Paid</th>
                <th className="px-5 py-3 text-gray-500 text-[10px] font-semibold uppercase tracking-wide">Pending</th>
                <th className="px-5 py-3 text-gray-500 text-[10px] font-semibold uppercase tracking-wide">Status</th>
                <th className="px-5 py-3 text-gray-500 text-[10px] font-semibold uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredData.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex flex-col">
                      <span className="text-gray-900 text-xs font-medium">{row.name}</span>
                      <span className="text-gray-500 text-[10px]">{row.email}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-gray-900 text-xs font-normal">{row.trips}</td>
                  <td className="px-5 py-4 text-gray-900 text-xs font-medium">{row.earnings}</td>
                  <td className="px-5 py-4 text-gray-900 text-xs font-medium">{row.charge}</td>
                  <td className="px-5 py-4 text-green-600 text-xs font-normal">{row.paid}</td>
                  <td className="px-5 py-4 text-red-600 text-xs font-medium">{row.pending}</td>
                  <td className="px-5 py-4">
                    <span
                      className={`px-2.5 py-1 inline-flex text-[10px] font-medium rounded-full capitalize leading-tight ${
                        row.status === 'paid' ? 'bg-green-100 text-green-700' :
                        row.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleViewDetailsClick(row)}
                        className="p-1 hover:bg-blue-50 rounded text-blue-600 transition-colors" 
                        title="View"
                      >
                        <Eye size={16} />
                      </button>
                      <button 
                        onClick={() => handleEmailClick(row)}
                        className="p-1 hover:bg-orange-50 rounded text-orange-500 transition-colors" 
                        title="Email"
                      >
                        <Mail size={16} />
                      </button>
                      <button 
                        onClick={() => handleSuspend(row.id)}
                        className={`p-1 rounded transition-colors ${
                          row.status !== 'suspend'
                            ? 'hover:bg-red-50 text-red-500' 
                            : 'text-gray-400 opacity-50 cursor-not-allowed'
                        }`} 
                        title="Suspend User"
                        disabled={row.status === 'suspend'}
                      >
                        <UserX size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Email Modal Component */}
      <EmailModal 
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        user={selectedUserForEmail}
        onSend={handleSendEmail}
      />

      {/* Driver Details Modal Component */}
      <DriverDetailsModal 
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        driver={selectedDriver}
        onSuspend={handleSuspend}
        onRemind={handleEmailClick}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
};

export default Rate;