import React, { useState } from 'react';
import { Eye, Check, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DriverDetailsModal from './DriverDetails';

export let driversData = [
  {
    id: 'D001',
    name: 'John Parker',
    email: 'john.parker@email.com',
    phone: '+1 234-567-9001',
    carName: 'Toyota Camry 2021',
    carPlate: 'ABC-1234',
    date: '2026-03-08',
    status: 'pending',
    avatar: 'https://placehold.co/33x33'
  },
  {
    id: 'D002',
    name: 'Maria Garcia',
    email: 'maria.garcia@email.com',
    phone: '+1 234-567-9002',
    carName: 'Honda Accord 2022',
    carPlate: 'XYZ-5678',
    date: '2026-03-05',
    status: 'approved',
    avatar: 'https://placehold.co/33x33'
  },
  {
    id: 'D003',
    name: 'Kevin Lee',
    email: 'kevin.lee@email.com',
    phone: '+1 234-567-9003',
    carName: 'Nissan Altima 2020',
    carPlate: 'DEF-9012',
    date: '2026-03-04',
    status: 'rejected',
    avatar: 'https://placehold.co/33x33'
  },
  {
    id: 'D004',
    name: 'Sophie Turner',
    email: 'sophie.turner@email.com',
    phone: '+1 234-567-9004',
    carName: 'Mazda 6 2021',
    carPlate: 'GHI-3456',
    date: '2026-03-07',
    status: 'pending',
    avatar: 'https://placehold.co/33x33'
  }
];

const tabs = ['All', 'Pending', 'Approved', 'Rejected'];

const Drivers = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('All');
  const [drivers, setDrivers] = useState(driversData);
  const [selectedDriverId, setSelectedDriverId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleStatusChange = (driverId, newStatus) => {
    setDrivers((prevDrivers) =>
      prevDrivers.map((driver) =>
        driver.id === driverId ? { ...driver, status: newStatus } : driver
      )
    );
  };

  const filteredDrivers = drivers.filter(
    (driver) => activeTab === 'All' || driver.status === activeTab.toLowerCase()
  );

  return (
    <div className="w-full h-full flex flex-col gap-6 p-2 md:p-6 font-sans">
      {/* Header */}
      <div className="flex flex-col gap-1.5">
        <h1 className="text-gray-900 text-xl font-bold leading-7">Driver Verification</h1>
        <p className="text-gray-600 text-sm font-normal leading-5">Review and approve driver documents</p>
      </div>

      {/* Tabs Card */}
      <div className="p-4 bg-white rounded-lg border border-gray-200 flex flex-col items-start overflow-x-auto">
        <div className="inline-flex items-center gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-1.5 rounded-lg text-sm font-medium leading-5 transition-colors whitespace-nowrap ${
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

      {/* Table Card */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[900px]">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Driver</th>
              <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
              <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Car Details</th>
              <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted Date</th>
              <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredDrivers.map((driver) => (
              <tr key={driver.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img className="w-9 h-9 rounded-full object-cover" src={driver.avatar} alt={driver.name} />
                    <div className="flex flex-col">
                      <span className="text-gray-900 text-sm font-medium">{driver.name}</span>
                      <span className="text-gray-500 text-xs">{driver.id}</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="text-gray-900 text-sm">{driver.email}</span>
                    <span className="text-gray-500 text-xs">{driver.phone}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="text-gray-900 text-sm">{driver.carName}</span>
                    <span className="text-gray-500 text-xs">{driver.carPlate}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-900 text-sm">
                  {driver.date}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex px-2.5 py-1 rounded-full text-[11px] font-medium leading-4 capitalize ${
                      driver.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-700'
                        : driver.status === 'approved'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {driver.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <button 
                      className="text-blue-600 hover:text-blue-800 transition-colors" 
                      title="View"
                      onClick={() => {
                        setSelectedDriverId(driver.id);
                        setIsModalOpen(true);
                      }}
                    >
                      <Eye className="w-[18px] h-[18px]" />
                    </button>
                    {driver.status === 'pending' && (
                      <>
                        <button 
                          className="text-green-600 hover:text-green-800 transition-colors" 
                          title="Approve"
                          onClick={() => handleStatusChange(driver.id, 'approved')}
                        >
                          <Check className="w-[18px] h-[18px]" strokeWidth={2.5} />
                        </button>
                        <button 
                          className="text-red-600 hover:text-red-800 transition-colors" 
                          title="Reject"
                          onClick={() => handleStatusChange(driver.id, 'rejected')}
                        >
                          <X className="w-[18px] h-[18px]" strokeWidth={2.5} />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <DriverDetailsModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        driverId={selectedDriverId}
        onUpdateStatus={handleStatusChange}
      />
    </div>
  );
};

export default Drivers;