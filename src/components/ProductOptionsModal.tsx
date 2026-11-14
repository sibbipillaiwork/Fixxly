import React from 'react';
import { ProductItem, ProductOption } from '../data/products';
import { X, ShieldCheck } from 'lucide-react';

interface ProductOptionsModalProps {
  product: ProductItem | null;
  isOpen: boolean;
  onClose: () => void;
  onSelectOption: (option: ProductOption) => void;
  currentOptionId?: string;
}

export const ProductOptionsModal: React.FC<ProductOptionsModalProps> = ({
  product,
  isOpen,
  onClose,
  onSelectOption,
  currentOptionId
}) => {
  if (!isOpen || !product || !product.options) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div 
        className="bg-white rounded-2xl w-full max-w-md shadow-2xl border border-gray-100 overflow-hidden animate-slide-down"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50/50">
          <div>
            <span className="text-[10px] font-bold tracking-wider text-gray-500 uppercase">
              {product.brand}
            </span>
            <h3 className="text-sm font-bold text-[#0b1d3a] line-clamp-1">
              Select Variation
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Product Snapshot */}
        <div className="p-4 flex items-center gap-3 bg-white border-b border-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className="w-14 h-14 rounded-lg object-cover border border-gray-200"
          />
          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-semibold text-gray-900 line-clamp-2">
              {product.name}
            </h4>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[11px] font-medium text-green-700 bg-green-50 px-1.5 py-0.5 rounded border border-green-200">
                30-Min Fast Delivery
              </span>
              <span className="text-[11px] text-gray-500">
                In Stock for 30-Min Delivery
              </span>
            </div>
          </div>
        </div>

        {/* Options List */}
        <div className="p-4 space-y-2.5 max-h-[50vh] overflow-y-auto">
          <div className="text-xs font-semibold text-gray-700 mb-1 flex items-center justify-between">
            <span>Available Sizes / Packs</span>
            <span className="text-[11px] text-gray-400">Trade Pricing</span>
          </div>

          {product.options.map((opt) => {
            const isSelected = currentOptionId === opt.id;
            return (
              <div
                key={opt.id}
                onClick={() => {
                  onSelectOption(opt);
                  onClose();
                }}
                className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  isSelected
                    ? "border-[#ff6b00] bg-orange-50/50 shadow-xs"
                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50/70"
                }`}
              >
                <div>
                  <div className="text-xs font-bold text-gray-900">
                    {opt.label}
                  </div>
                  <div className="text-[11px] text-gray-500">
                    {opt.spec}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-xs font-extrabold text-green-700">
                      ₹{opt.price}
                    </div>
                    <div className="text-[10px] text-gray-400 line-through">
                      ₹{opt.mrp}
                    </div>
                  </div>

                  <button
                    type="button"
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                      isSelected
                        ? "bg-[#ff6b00] text-white"
                        : "bg-orange-100/70 text-[#ff6b00] hover:bg-[#ff6b00] hover:text-white"
                    }`}
                  >
                    {isSelected ? "Selected" : "Select"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Guarantee */}
        <div className="p-3 bg-gray-50 text-[11px] text-gray-500 flex items-center justify-center gap-2 border-t border-gray-100">
          <ShieldCheck className="w-3.5 h-3.5 text-green-600" />
          <span>100% Genuine Direct-from-Manufacturer Material</span>
        </div>
      </div>
    </div>
  );
};
