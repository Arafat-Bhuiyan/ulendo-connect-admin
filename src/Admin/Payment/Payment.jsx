import React, { useState } from 'react';
import { Eye, Check, X } from 'lucide-react';
import PaymentDetailsModal from './PaymentDetailsModal';

const Payment = () => {
  const [activeTab, setActiveTab] = useState('All');
  
  const tabs = ['All', 'Pending', 'Approved', 'Reject'];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);

  const [tableData, setTableData] = useState([
    {
      id: 'PAY001',
      date: '2026-03-09',
      passenger: 'Michael Chen',
      driver: 'Sarah Johnson',
      rideId: 'RIDE12345',
      amount: '$45.50',
      commission: '$9.10',
      commissionRate: '20%',
      earnings: '$36.40',
      status: 'pending',
    },
    {
      id: 'PAY002',
      date: '2026-03-08',
      passenger: 'James Wilson',
      driver: 'Emily Rodriguez',
      rideId: 'RIDE12346',
      amount: '$32.00',
      commission: '$6.40',
      commissionRate: '20%',
      earnings: '$25.60',
      status: 'approved',
    },
    {
      id: 'PAY003',
      date: '2026-03-07',
      passenger: 'Anna Thompson',
      driver: 'David Martinez',
      rideId: 'RIDE12347',
      amount: '$58.75',
      commission: '$11.75',
      commissionRate: '20%',
      earnings: '$47.00',
      status: 'approved',
    },
    {
      id: 'PAY004',
      date: '2026-03-06',
      passenger: 'Michael Chen',
      driver: 'Robert Brown',
      rideId: 'RIDE12348',
      amount: '$28.50',
      commission: '$5.70',
      commissionRate: '20%',
      earnings: '$22.80',
      status: 'reject',
    },
    {
      id: 'PAY005',
      date: '2026-03-09',
      passenger: 'James Wilson',
      driver: 'Lisa Anderson',
      rideId: 'RIDE12349',
      amount: '$41.20',
      commission: '$8.24',
      commissionRate: '20%',
      earnings: '$32.96',
      status: 'pending',
    }
  ]);

  const filteredData = tableData.filter((row) => {
    if (activeTab === 'All') return true;
    return row.status.toLowerCase() === activeTab.toLowerCase();
  });

  const handleViewDetails = (payment) => {
    setSelectedPayment(payment);
    setIsModalOpen(true);
  };

  const handleConfirmPayment = (id) => {
    setTableData(prev => prev.map(item => item.id === id ? { ...item, status: 'approved' } : item));
    if (selectedPayment?.id === id) {
      setSelectedPayment(prev => ({ ...prev, status: 'approved' }));
    }
  };

  const handleRejectPayment = (id) => {
    setTableData(prev => prev.map(item => item.id === id ? { ...item, status: 'reject' } : item));
    if (selectedPayment?.id === id) {
      setSelectedPayment(prev => ({ ...prev, status: 'reject' }));
    }
  };

  return (
    <div className="w-full flex-1 mx-auto p-4 md:p-6 flex flex-col gap-6 font-['Inter'] bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col gap-1">
        <h1 className="text-gray-900 text-xl font-bold leading-7">Payment Management</h1>
        <p className="text-gray-600 text-sm font-normal leading-5">Manage ride payments and driver earnings</p>
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
                <th className="px-5 py-3 text-gray-500 text-[10px] font-semibold uppercase tracking-wide">Payment ID</th>
                <th className="px-5 py-3 text-gray-500 text-[10px] font-semibold uppercase tracking-wide">Passenger</th>
                <th className="px-5 py-3 text-gray-500 text-[10px] font-semibold uppercase tracking-wide">Driver</th>
                <th className="px-5 py-3 text-gray-500 text-[10px] font-semibold uppercase tracking-wide">Ride ID</th>
                <th className="px-5 py-3 text-gray-500 text-[10px] font-semibold uppercase tracking-wide">Payment Amount</th>
                <th className="px-5 py-3 text-gray-500 text-[10px] font-semibold uppercase tracking-wide">Commission</th>
                <th className="px-5 py-3 text-gray-500 text-[10px] font-semibold uppercase tracking-wide">Driver Earnings</th>
                <th className="px-5 py-3 text-gray-500 text-[10px] font-semibold uppercase tracking-wide">Status</th>
                <th className="px-5 py-3 text-gray-500 text-[10px] font-semibold uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredData.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex flex-col">
                      <span className="text-gray-900 text-xs font-medium">{row.id}</span>
                      <span className="text-gray-500 text-[10px]">{row.date}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-gray-900 text-xs font-normal">{row.passenger}</td>
                  <td className="px-5 py-4 text-gray-900 text-xs font-normal">{row.driver}</td>
                  <td className="px-5 py-4 text-gray-900 text-xs font-normal">{row.rideId}</td>
                  <td className="px-5 py-4 text-gray-900 text-xs font-medium">{row.amount}</td>
                  <td className="px-5 py-4">
                    <div className="flex flex-col">
                      <span className="text-gray-900 text-xs font-normal">{row.commission}</span>
                      <span className="text-gray-500 text-[10px]">{row.commissionRate}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-green-600 text-xs font-medium">{row.earnings}</td>
                  <td className="px-5 py-4">
                    <span
                      className={`px-2.5 py-1 inline-flex text-[10px] font-medium rounded-full capitalize leading-tight ${
                        row.status === 'approved' ? 'bg-blue-100 text-blue-700' :
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
                        className="p-1 hover:bg-blue-50 rounded text-blue-600 transition-colors" 
                        title="View"
                        onClick={() => handleViewDetails(row)}
                      >
                        <Eye size={16} />
                      </button>
                      
                      {row.status === 'pending' && (
                        <>
                          <button 
                            className="p-1 hover:bg-green-50 rounded text-green-600 transition-colors" 
                            title="Approve"
                            onClick={() => {
                              setTableData(prev => prev.map(item => item.id === row.id ? { ...item, status: 'approved' } : item))
                            }}
                          >
                            <Check size={16} />
                          </button>
                          <button 
                            className="p-1 hover:bg-red-50 rounded text-red-600 transition-colors" 
                            title="Reject"
                            onClick={() => {
                              setTableData(prev => prev.map(item => item.id === row.id ? { ...item, status: 'reject' } : item))
                            }}
                          >
                            <X size={16} />
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
      </div>

      <PaymentDetailsModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        payment={selectedPayment}
        onConfirm={handleConfirmPayment}
        onReject={handleRejectPayment}
      />
    </div>
  );
};

export default Payment;