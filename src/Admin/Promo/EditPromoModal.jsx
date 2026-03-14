import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const EditPromoModal = ({ isOpen, onClose, onUpdate, initialData }) => {
  const [formData, setFormData] = useState({
    code: '',
    description: '',
    discountType: 'Percentage (%)',
    discountValue: '',
    maxDiscount: '',
    minOrder: '',
    usageLimit: '',
    validFrom: '',
    validUntil: ''
  });

  useEffect(() => {
    if (initialData && isOpen) {
      let discountType = 'Percentage (%)';
      let discountValue = '';
      if (initialData.discount?.includes('%')) {
        discountType = 'Percentage (%)';
        discountValue = initialData.discount.replace('%', '');
      } else if (initialData.discount?.includes('$')) {
        discountType = 'Fixed Amount ($)';
        discountValue = initialData.discount.replace('$', '');
      } else {
        discountValue = initialData.discount;
      }

      setFormData({
        code: initialData.code || '',
        description: initialData.description || '',
        discountType,
        discountValue,
        maxDiscount: initialData.maxDiscount || '',
        minOrder: initialData.minOrder || '',
        usageLimit: initialData.usageLimit || '',
        validFrom: initialData.startDate || '',
        validUntil: initialData.endDate || ''
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData((prev) => {
      const nextState = { ...prev, [name]: value };

      // Ensure validUntil cannot be before validFrom
      if (name === 'validFrom' && nextState.validUntil && value > nextState.validUntil) {
        nextState.validUntil = '';
      }

      return nextState;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.code || !formData.description || !formData.discountValue || !formData.usageLimit || !formData.validFrom || !formData.validUntil) {
      toast.error('Please fill in all required fields', { position: 'top-center' });
      return;
    }

    const discountStr = formData.discountType === 'Percentage (%)' 
      ? `${formData.discountValue}%` 
      : `$${formData.discountValue}`;

    const updatedPromo = {
      ...initialData,
      code: formData.code,
      description: formData.description,
      discount: discountStr,
      usageLimit: Number(formData.usageLimit),
      startDate: formData.validFrom,
      endDate: formData.validUntil,
    };

    onUpdate(updatedPromo);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 overflow-y-auto">
      <div className="relative w-full max-w-[672px] p-6 font-sans bg-white rounded-xl shadow-xl mt-auto mb-auto">
        <h2 className="text-xl font-bold text-gray-900 mb-6 font-['Inter']">Edit Promo Code</h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 font-['Inter']">
          <div className="flex flex-col gap-2">
            <label className="text-gray-700 text-sm font-medium leading-5">
              Promo Code <span className="text-red-500">*</span>
            </label>
            <input 
              type="text" 
              name="code"
              placeholder="e.g., SAVE20" 
              value={formData.code}
              onChange={handleChange}
              className="w-full h-10 px-4 py-2 rounded-[10px] outline outline-1 outline-offset-[-1px] outline-gray-300 focus:outline-blue-500 text-gray-900 text-base font-normal placeholder:text-gray-400"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-gray-700 text-sm font-medium leading-5">
              Description <span className="text-red-500">*</span>
            </label>
            <input 
              type="text" 
              name="description"
              placeholder="e.g., Get 20% off your next ride" 
              value={formData.description}
              onChange={handleChange}
              className="w-full h-10 px-4 py-2 rounded-[10px] outline outline-1 outline-offset-[-1px] outline-gray-300 focus:outline-blue-500 text-gray-900 text-base font-normal placeholder:text-gray-400"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 flex flex-col gap-2">
              <label className="text-gray-700 text-sm font-medium leading-5">
                Discount Type <span className="text-red-500">*</span>
              </label>
              <select 
                name="discountType"
                value={formData.discountType}
                onChange={handleChange}
                className="w-full h-10 px-4 rounded-[10px] outline outline-1 outline-offset-[-1px] outline-gray-300 focus:outline-blue-500 text-gray-900 text-base font-normal bg-white"
              >
                <option value="Percentage (%)">Percentage (%)</option>
                <option value="Fixed Amount ($)">Fixed Amount ($)</option>
              </select>
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <label className="text-gray-700 text-sm font-medium leading-5">
                Discount Value <span className="text-red-500">*</span>
              </label>
              <input 
                type="number" 
                name="discountValue"
                placeholder="10" 
                value={formData.discountValue}
                onChange={handleChange}
                className="w-full h-10 px-4 py-2 rounded-[10px] outline outline-1 outline-offset-[-1px] outline-gray-300 focus:outline-blue-500 text-gray-900 text-base font-normal placeholder:text-gray-400"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-gray-700 text-sm font-medium leading-5">
              Max Discount Amount ($)
            </label>
            <input 
              type="number" 
              name="maxDiscount"
              placeholder="10.00" 
              value={formData.maxDiscount}
              onChange={handleChange}
              className="w-full h-10 px-4 py-2 rounded-[10px] outline outline-1 outline-offset-[-1px] outline-gray-300 focus:outline-blue-500 text-gray-900 text-base font-normal placeholder:text-gray-400"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-gray-700 text-sm font-medium leading-5">
              Minimum Order Amount ($)
            </label>
            <input 
              type="number" 
              name="minOrder"
              placeholder="20.00" 
              value={formData.minOrder}
              onChange={handleChange}
              className="w-full h-10 px-4 py-2 rounded-[10px] outline outline-1 outline-offset-[-1px] outline-gray-300 focus:outline-blue-500 text-gray-900 text-base font-normal placeholder:text-gray-400"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-gray-700 text-sm font-medium leading-5">
              Usage Limit <span className="text-red-500">*</span>
            </label>
            <input 
              type="number" 
              name="usageLimit"
              placeholder="100" 
              value={formData.usageLimit}
              onChange={handleChange}
              className="w-full h-10 px-4 py-2 rounded-[10px] outline outline-1 outline-offset-[-1px] outline-gray-300 focus:outline-blue-500 text-gray-900 text-base font-normal placeholder:text-gray-400"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 flex flex-col gap-2">
              <label className="text-gray-700 text-sm font-medium leading-5">
                Valid From <span className="text-red-500">*</span>
              </label>
              <input 
                type="date" 
                name="validFrom"
                value={formData.validFrom}
                onChange={handleChange}
                className="w-full h-10 px-4 py-2 rounded-[10px] outline outline-1 outline-offset-[-1px] outline-gray-300 focus:outline-blue-500 text-gray-900 text-base font-normal"
              />
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <label className="text-gray-700 text-sm font-medium leading-5">
                Valid Until <span className="text-red-500">*</span>
              </label>
              <input 
                type="date" 
                name="validUntil"
                value={formData.validUntil}
                min={formData.validFrom}
                onChange={handleChange}
                className="w-full h-10 px-4 py-2 rounded-[10px] outline outline-1 outline-offset-[-1px] outline-gray-300 focus:outline-blue-500 text-gray-900 text-base font-normal"
              />
            </div>
          </div>

          <div className="w-full pt-4 flex flex-col sm:flex-row justify-start items-center gap-4">
            <button 
              type="submit"
              className="w-full sm:w-72 py-3 bg-blue-600 hover:bg-blue-700 rounded-[10px] text-white text-base font-medium transition-colors"
            >
              Update Promo Code
            </button>
            <button 
              type="button"
              onClick={onClose}
              className="w-full sm:w-72 py-3 bg-gray-100 hover:bg-gray-200 rounded-[10px] text-gray-700 text-base font-medium transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPromoModal;
