import React, { useState } from 'react';
import { Eye, Check } from 'lucide-react';
import ComplaintDetailsModal from './ComplaintDetailsModal';

const Complaint = () => {
  const [activeTab, setActiveTab] = useState('All');
  
  const tabs = ['All', 'Open', 'In Review', 'Resolved'];

  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  const [tableData, setTableData] = useState([
    {
      id: 'COMP001',
      name: 'Michael Chen',
      role: 'passenger',
      message: 'Driver was very rude and took a longer route than necessary.',
      date: '2026-03-08',
      status: 'open',
    },
    {
      id: 'COMP002',
      name: 'Sarah Johnson',
      role: 'driver',
      message: 'Payment for ride RIDE12289 has not been credited to my wallet.',
      date: '2026-03-07',
      status: 'in review',
    },
    {
      id: 'COMP003',
      name: 'Anna Thompson',
      role: 'passenger',
      message: 'Unable to cancel ride after driver accepted. App froze.',
      date: '2026-03-06',
      status: 'resolved',
    },
    {
      id: 'COMP004',
      name: 'David Martinez',
      role: 'driver',
      message: 'Passenger did not show up after I waited for 10 minutes.',
      date: '2026-03-05',
      status: 'resolved',
    },
    {
      id: 'COMP005',
      name: 'James Wilson',
      role: 'passenger',
      message: 'Driver was driving too fast and made me feel unsafe.',
      date: '2026-03-09',
      status: 'open',
    }
  ]);

  const filteredData = tableData.filter((row) => {
    if (activeTab === 'All') return true;
    return row.status.toLowerCase() === activeTab.toLowerCase();
  });

  const handleResolve = (id) => {
    setTableData(prev => prev.map(item => item.id === id ? { ...item, status: 'resolved' } : item));
    if (selectedComplaint && selectedComplaint.id === id) {
      setSelectedComplaint(prev => ({ ...prev, status: 'resolved' }));
    }
  };

  const handleViewDetails = (complaint) => {
    let updatedComplaint = complaint;
    if (complaint.status === 'open') {
      updatedComplaint = { ...complaint, status: 'in review' };
      setTableData(prev => prev.map(item => item.id === complaint.id ? updatedComplaint : item));
    }
    setSelectedComplaint(updatedComplaint);
    setIsDetailsModalOpen(true);
  };

  const handleReply = (id) => {
    console.log(`Replying to complaint ${id}`);
  };

  return (
    <div className="w-full flex-1 mx-auto p-4 md:p-6 flex flex-col gap-6 font-['Inter'] bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col gap-1">
        <h1 className="text-gray-900 text-xl font-bold leading-7">Complaint Management</h1>
        <p className="text-gray-600 text-sm font-normal leading-5">Handle driver and passenger complaints</p>
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
      <div className="bg-white rounded-lg border border-gray-200 flex flex-col overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-5 py-3 text-gray-500 text-[10px] font-semibold uppercase tracking-wide">Complaint ID</th>
                <th className="px-5 py-3 text-gray-500 text-[10px] font-semibold uppercase tracking-wide">User</th>
                <th className="px-5 py-3 text-gray-500 text-[10px] font-semibold uppercase tracking-wide">Message</th>
                <th className="px-5 py-3 text-gray-500 text-[10px] font-semibold uppercase tracking-wide">Date</th>
                <th className="px-5 py-3 text-gray-500 text-[10px] font-semibold uppercase tracking-wide">Status</th>
                <th className="px-5 py-3 text-gray-500 text-[10px] font-semibold uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredData.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4">
                    <span className="text-gray-900 text-xs font-medium">{row.id}</span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex flex-col items-start gap-1">
                      <span className="text-gray-900 text-xs font-medium">{row.name}</span>
                      <span className={`px-2 py-0.5 text-[10px] font-normal rounded-full capitalize leading-3 ${
                        row.role === 'passenger' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {row.role}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-4 w-[40%] max-w-sm">
                    <p className="text-gray-700 text-xs font-normal truncate" title={row.message}>
                      {row.message}
                    </p>
                  </td>
                  <td className="px-5 py-4 text-gray-900 text-xs font-normal whitespace-nowrap">{row.date}</td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <span
                      className={`px-2.5 py-1 inline-flex text-[10px] font-medium rounded-full capitalize leading-tight ${
                        row.status === 'resolved' ? 'bg-green-100 text-green-700' :
                        row.status === 'in review' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button 
                        className="p-1 hover:bg-blue-50 rounded text-blue-600 transition-colors" 
                        title="View Details"
                        onClick={() => handleViewDetails(row)}
                      >
                        <Eye size={16} />
                      </button>
                      
                      {row.status !== 'resolved' && (
                        <button 
                          className="p-1 hover:bg-green-50 rounded text-green-600 transition-colors" 
                          title="Resolve Complaint"
                          onClick={() => handleResolve(row.id)}
                        >
                          <Check size={16} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ComplaintDetailsModal 
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        complaint={selectedComplaint}
        onResolve={handleResolve}
        onReply={handleReply}
      />
    </div>
  );
};

export default Complaint;