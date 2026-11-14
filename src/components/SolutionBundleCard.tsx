import React, { useState } from 'react';
import { SolutionBundle } from '../data/products';
import { useCart } from '../context/CartContext';
import { Sparkles, Plus, Check, Clock } from 'lucide-react';

interface SolutionBundleCardProps {
  bundle: SolutionBundle;
}

export const SolutionBundleCard: React.FC<SolutionBundleCardProps> = ({ bundle }) => {
  const { addBundleToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddAll = (e: React.MouseEvent) => {
    e.stopPropagation();
    addBundleToCart(bundle);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2500);
  };

  return (
    <div className="mx-3 my-2.5 rounded-xl border border-orange-200 bg-gradient-to-br from-amber-50/70 via-white to-orange-50/40 p-3.5 sm:p-4 shadow-sm relative overflow-hidden transition-all duration-200">
      {/* Top Banner Tag */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-1.5">
          <span className="flex items-center gap-1 text-[11px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-[#ff6b00] text-white shadow-2xs">
            <Sparkles className="w-3 h-3" />
            {bundle.badge}
          </span>
          <span className="flex items-center gap-1 text-[11px] font-semibold text-gray-600 bg-white/80 px-2 py-0.5 rounded-full border border-gray-200">
            <Clock className="w-3 h-3 text-[#ff6b00]" />
            <span>{bundle.delivery_time_mins} MINS</span>
          </span>
        </div>

        <span className="text-[11px] font-bold text-green-700 bg-green-100/80 px-2 py-0.5 rounded-full border border-green-200">
          Save ₹{bundle.bundle_mrp - bundle.bundle_price} ({bundle.bundle_discount_percent}% OFF)
        </span>
      </div>

      {/* Title & Description */}
      <div className="mb-3">
        <h3 className="text-sm sm:text-base font-bold text-[#0b1d3a] flex items-center gap-2">
          {bundle.title}
        </h3>
        <p className="text-xs text-gray-600 mt-0.5 line-clamp-1">
          {bundle.subtitle}
        </p>
      </div>

      {/* Products included in the bundle */}
      <div className="grid grid-cols-3 gap-2 py-2 px-2 bg-white/90 rounded-lg border border-gray-200/80 mb-3">
        {bundle.items.map((item, idx) => (
          <div key={item.id} className="flex flex-col items-center text-center p-1 relative">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-md overflow-hidden bg-gray-50 border border-gray-100 mb-1.5 relative shrink-0">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <span className="absolute bottom-0 right-0 text-[9px] font-bold bg-[#0b1d3a] text-white px-1 rounded-tl">
                #{idx + 1}
              </span>
            </div>
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-tight">
              {item.brand}
            </span>
            <span className="text-[11px] font-medium text-gray-900 line-clamp-1 leading-tight w-full">
              {item.name}
            </span>
            <span className="text-[10px] text-gray-500 font-mono">
              ₹{item.price}
            </span>
          </div>
        ))}
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-between pt-1">
        <div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-base sm:text-lg font-extrabold text-green-700">
              ₹{bundle.bundle_price}
            </span>
            <span className="text-xs text-gray-400 line-through font-mono">
              ₹{bundle.bundle_mrp}
            </span>
          </div>
          <span className="text-[11px] text-gray-500 font-medium">
            Complete 3-part fix kit
          </span>
        </div>

        <button
          type="button"
          onClick={handleAddAll}
          className={`inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-bold shadow-sm transition-all duration-200 cursor-pointer ${
            isAdded
              ? "bg-green-600 text-white"
              : "bg-[#ff6b00] hover:bg-[#e55f00] text-white active:scale-95"
          }`}
        >
          {isAdded ? (
            <>
              <Check className="w-4 h-4 stroke-[3]" />
              <span>Added to Cart!</span>
            </>
          ) : (
            <>
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>+ Add All (3 items)</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
