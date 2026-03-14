import React, { useState } from 'react';
import { 
  Plus, Ticket, CheckCircle, Users, TrendingUp, 
  Copy, Calendar, Edit, X, Trash2
} from 'lucide-react';
import toast from 'react-hot-toast';
import CreatePromoModal from './CreatePromoModal';
import EditPromoModal from './EditPromoModal';
import PromoDetailsModal from './PromoDetailsModal';

const initialPromos = [
  {
    id: 1,
    code: 'SAVE10',
    description: 'Get 10% off your next ride',
    discount: '10%',
    usageCurrent: 23,
    usageLimit: 100,
    startDate: '2026-03-01',
    endDate: '2026-03-31',
    status: 'active'
  },
  {
    id: 2,
    code: 'FREE5',
    description: 'Get $5 off your next ride',
    discount: '$5',
    usageCurrent: 17,
    usageLimit: 50,
    startDate: '2026-03-01',
    endDate: '2026-03-31',
    status: 'active'
  },
  {
    id: 3,
    code: 'DISCOUNT20',
    description: 'Get 20% off your next ride',
    discount: '20%',
    usageCurrent: 45,
    usageLimit: 75,
    startDate: '2026-03-01',
    endDate: '2026-03-31',
    status: 'active'
  }
];

const Promo = () => {
  const [promos, setPromos] = useState(initialPromos);
  const [activeTab, setActiveTab] = useState('All');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [promoToEdit, setPromoToEdit] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [promoToShow, setPromoToShow] = useState(null);

  const handleCreatePromo = (newPromo) => {
    setPromos([newPromo, ...promos]);
    setIsCreateModalOpen(false);
    toast.success('Promo code created successfully!', { position: 'top-center' });
  };

  const handleOpenEditModal = (promo) => {
    setPromoToEdit(promo);
    setIsEditModalOpen(true);
  };

  const handleRowClick = (promo) => {
    setPromoToShow(promo);
    setIsDetailsModalOpen(true);
  };

  const handleUpdatePromo = (updatedPromo) => {
    setPromos(promos.map(p => p.id === updatedPromo.id ? updatedPromo : p));
    setIsEditModalOpen(false);
    toast.success('Promo code updated successfully!', { position: 'top-center' });
  };

  const handleCopyCode = async (code) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(code);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = code;
        textArea.style.position = "absolute";
        textArea.style.left = "-999999px";
        document.body.prepend(textArea);
        textArea.select();
        try {
          document.execCommand('copy');
        } catch (error) {
          console.error(error);
          throw new Error("Fallback copy failed");
        } finally {
          textArea.remove();
        }
      }
      toast.success(`Promo code ${code} copied!`, { position: 'top-center' });
    } catch (err) {
      toast.error('Failed to copy text');
    }
  };

  const handleExpire = (id) => {
    setPromos(promos.map(p => p.id === id ? { ...p, status: 'expired' } : p));
    toast.success('Promo code expired', { position: 'top-center' });
  };

  const handleDisable = (id) => {
    setPromos(promos.map(p => p.id === id ? { ...p, status: 'disabled' } : p));
    toast.success('Promo code disabled', { position: 'top-center' });
  };

  const filteredPromos = promos.filter(p => {
    if (activeTab === 'All') return true;
    return p.status.toLowerCase() === activeTab.toLowerCase();
  });

  const totalCodes = promos.length;
  const activeCodes = promos.filter(p => p.status === 'active').length;
  const totalUsage = promos.reduce((sum, p) => sum + p.usageCurrent, 0);
  const totalLimit = promos.reduce((sum, p) => sum + p.usageLimit, 0);
  const avgUsageRate = totalLimit === 0 ? 0 : (totalUsage / totalLimit * 100);

  return (
    <>
      <div className="w-full flex flex-col items-start gap-6">
        
        {/* Header */}
        <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex flex-col gap-[3.35px]">
            <h1 className="text-gray-900 text-xl font-bold leading-7">Promo Code Management</h1>
            <p className="text-gray-600 text-sm font-normal leading-5">Create and manage promotional codes for your ride-share app</p>
          </div>
          <button 
            onClick={() => setIsCreateModalOpen(true)}
            className="px-3 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg flex items-center gap-1.5 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Create Promo Code
          </button>
        </div>

        {/* Summary Cards */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 bg-white rounded-lg border border-gray-200 flex justify-between items-center shadow-sm">
            <div className="flex flex-col gap-1">
              <span className="text-gray-600 text-xs font-normal">Total Promo Codes</span>
              <span className="text-gray-900 text-xl font-bold">{totalCodes}</span>
            </div>
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
              <Ticket className="w-5 h-5" />
            </div>
          </div>
          
          <div className="p-5 bg-white rounded-lg border border-gray-200 flex justify-between items-center shadow-sm">
            <div className="flex flex-col gap-1">
              <span className="text-gray-600 text-xs font-normal">Active Codes</span>
              <span className="text-gray-900 text-xl font-bold">{activeCodes}</span>
            </div>
            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center text-green-600">
              <CheckCircle className="w-5 h-5" />
            </div>
          </div>

          <div className="p-5 bg-white rounded-lg border border-gray-200 flex justify-between items-center shadow-sm">
            <div className="flex flex-col gap-1">
              <span className="text-gray-600 text-xs font-normal">Total Usage</span>
              <span className="text-gray-900 text-xl font-bold">{totalUsage}</span>
            </div>
            <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center text-purple-600">
              <Users className="w-5 h-5" />
            </div>
          </div>

          <div className="p-5 bg-white rounded-lg border border-gray-200 flex justify-between items-center shadow-sm">
            <div className="flex flex-col gap-1">
              <span className="text-gray-600 text-xs font-normal">Avg Usage Rate</span>
              <span className="text-gray-900 text-xl font-bold">{avgUsageRate.toFixed(1)}%</span>
            </div>
            <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center text-orange-600">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="w-full p-4 bg-white rounded-lg border border-gray-200 shadow-sm flex items-center gap-1.5 overflow-x-auto">
          {['All', 'Active', 'Expired', 'Disabled'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="w-full bg-white rounded-lg border border-gray-200 overflow-x-auto shadow-sm">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-5 py-3 text-[10px] font-medium text-gray-500 uppercase tracking-wider w-40">Code</th>
                <th className="px-5 py-3 text-[10px] font-medium text-gray-500 uppercase tracking-wider w-52">Description</th>
                <th className="px-5 py-3 text-[10px] font-medium text-gray-500 uppercase tracking-wider w-28">Discount</th>
                <th className="px-5 py-3 text-[10px] font-medium text-gray-500 uppercase tracking-wider w-36">Usage</th>
                <th className="px-5 py-3 text-[10px] font-medium text-gray-500 uppercase tracking-wider w-56">Valid Period</th>
                <th className="px-5 py-3 text-[10px] font-medium text-gray-500 uppercase tracking-wider w-24">Status</th>
                <th className="px-5 py-3 text-[10px] font-medium text-gray-500 uppercase tracking-wider w-32">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredPromos.map(promo => {
                const usagePercent = Math.min(100, Math.round((promo.usageCurrent / promo.usageLimit) * 100));

                return (
                  <tr key={promo.id} onClick={() => handleRowClick(promo)} className="hover:bg-gray-50 transition-colors cursor-pointer">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-blue-600 font-bold font-mono text-sm">{promo.code}</span>
                        <button onClick={(e) => { e.stopPropagation(); handleCopyCode(promo.code); }} className="text-gray-400 hover:text-gray-600 transition-colors">
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-gray-900 text-xs">{promo.description}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-gray-900 text-xs font-medium">{promo.discount}</span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex flex-col gap-1.5 w-24">
                        <span className="text-gray-900 text-xs">{promo.usageCurrent} / {promo.usageLimit}</span>
                        <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-blue-600 rounded-full" 
                            style={{ width: `${usagePercent}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5 text-gray-500">
                        <Calendar className="w-4 h-4" />
                        <span className="text-gray-900 text-xs">{promo.startDate} to {promo.endDate}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex px-2 py-1 rounded-full text-[10px] font-normal lowercase tracking-wide ${
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
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2.5">
                        <button onClick={(e) => { e.stopPropagation(); handleOpenEditModal(promo); }} className="text-blue-600 hover:text-blue-800 transition-colors" title="Edit">
                          <Edit className="w-4 h-4" />
                        </button>
                        {promo.status === 'active' && (
                          <button onClick={(e) => { e.stopPropagation(); handleDisable(promo.id); }} className="text-orange-500 hover:text-orange-700 transition-colors" title="Disable">
                            <X className="w-4 h-4" />
                          </button>
                        )}
                        <button onClick={(e) => { e.stopPropagation(); handleExpire(promo.id); }} className="text-red-500 hover:text-red-700 transition-colors" title="Expire">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filteredPromos.length === 0 && (
                <tr>
                  <td colSpan="7" className="px-5 py-8 text-center text-gray-500 text-sm">
                    No promo codes found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <CreatePromoModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
        onCreate={handleCreatePromo}
      />

      <EditPromoModal 
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        initialData={promoToEdit}
        onUpdate={handleUpdatePromo}
      />

      <PromoDetailsModal 
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        promo={promoToShow}
        onExpire={handleExpire}
        onDisable={handleDisable}
        onCopy={handleCopyCode}
      />
    </>
  );
};

export default Promo;