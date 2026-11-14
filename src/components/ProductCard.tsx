import React, { useState } from 'react';
import { ProductItem, ProductOption } from '../data/products';
import { useCart } from '../context/CartContext';
import { ProductOptionsModal } from './ProductOptionsModal';
import { Plus, Minus, Zap, ChevronDown } from 'lucide-react';

interface ProductCardProps {
  product: ProductItem;
  viewMode?: 'grid' | 'compact';
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { items, addToCart, updateQuantity } = useCart();
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<ProductOption | null>(
    product.options && product.options.length > 0 ? product.options[0] : null
  );

  const cartEntry = items[product.id];
  const quantity = cartEntry ? cartEntry.quantity : 0;

  const currentPrice = selectedOption ? selectedOption.price : product.price;
  const currentMrp = selectedOption ? selectedOption.mrp : product.mrp;
  const currentSpec = selectedOption ? (selectedOption.spec || selectedOption.label) : product.spec;
  const currentDiscount = selectedOption ? selectedOption.discount_percent : product.discount_percent;

  const handleAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (product.has_options && !cartEntry) {
      setIsOptionsOpen(true);
    } else {
      addToCart(product, selectedOption?.id, 1);
    }
  };

  const handleIncrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    updateQuantity(product.id, quantity + 1);
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    updateQuantity(product.id, quantity - 1);
  };

  return (
    <>
      <div className="group bg-white rounded-xl sm:rounded-2xl border border-[#e5e7eb] hover:border-[#ff6b00]/40 p-2.5 sm:p-3.5 flex flex-col justify-between shadow-xs hover:shadow-cardHover transition-all duration-200 relative overflow-hidden h-full">
        {/* Top Product Media */}
        <div>
          <div className="relative w-full aspect-square bg-[#f8f9fa] rounded-lg sm:rounded-xl overflow-hidden mb-2 border border-gray-100 flex items-center justify-center">
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {/* Discount Badge on top-right */}
            <div className="absolute top-1.5 right-1.5 bg-[#ff6b00] text-white text-[9px] sm:text-[11px] font-extrabold px-1.5 sm:px-2 py-0.5 rounded shadow-xs z-10">
              {currentDiscount}% OFF
            </div>

            {/* 30-Min Delivery Badge on bottom-left - never overlaps with discount */}
            <div className="absolute bottom-1.5 left-1.5 bg-[#0b1d3a]/90 backdrop-blur-xs text-white text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded shadow-xs flex items-center gap-1 z-10">
              <Zap className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#ff6b00] fill-[#ff6b00]" />
              <span>30 MINS</span>
            </div>
          </div>

          {/* Brand Tag in small bold uppercase font */}
          <div className="text-[9px] sm:text-[11px] font-extrabold uppercase tracking-wider text-gray-500 mb-0.5">
            {product.brand}
          </div>

          {/* Product Title - Clean 2-line clamp */}
          <h4
            className="text-xs sm:text-[14px] font-bold text-[#111827] line-clamp-2 leading-snug min-h-[2.3rem] group-hover:text-[#ff6b00] transition-colors"
            title={product.name}
          >
            {product.name}
          </h4>

          {/* Prominent Specification Pill */}
          <div className="mt-1.5 mb-2">
            {product.has_options ? (
              <button
                type="button"
                onClick={() => setIsOptionsOpen(true)}
                className="w-full text-left inline-flex items-center justify-between px-2 py-1 bg-gray-50 hover:bg-orange-50/50 rounded-lg border border-gray-200 hover:border-orange-200 text-[10px] sm:text-xs font-semibold text-gray-700 transition-colors cursor-pointer"
              >
                <span className="truncate">{currentSpec}</span>
                <ChevronDown className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-400 shrink-0 ml-1" />
              </button>
            ) : (
              <span className="inline-block px-2 py-1 bg-gray-50 rounded-lg border border-gray-200 text-[10px] sm:text-xs font-medium text-gray-600 truncate max-w-full">
                {currentSpec}
              </span>
            )}
          </div>
        </div>

        {/* Pricing & CTA Button */}
        <div className="pt-2 border-t border-[#e5e7eb] flex items-center justify-between gap-1.5 mt-auto">
          <div className="min-w-0">
            <div className="flex items-baseline gap-1.5 flex-wrap">
              {/* Bold Green Price */}
              <span className="text-sm sm:text-lg font-extrabold text-[#16a34a]">
                ₹{currentPrice}
              </span>
              {/* Strikethrough MRP */}
              <span className="text-[10px] sm:text-xs text-[#6b7280] line-through font-mono">
                ₹{currentMrp}
              </span>
            </div>
            <span className="text-[9px] sm:text-[10px] text-gray-400 block font-medium">
              Incl. GST
            </span>
          </div>

          {/* Add / Stepper Button */}
          {quantity === 0 ? (
            product.has_options ? (
              <button
                type="button"
                onClick={handleAddClick}
                className="inline-flex items-center justify-center px-2.5 sm:px-3 py-1.5 rounded-lg bg-orange-50 hover:bg-[#ff6b00] text-[#ff6b00] hover:text-white border border-[#ff6b00] text-[10px] sm:text-xs font-bold transition-all duration-150 cursor-pointer shadow-2xs active:scale-95 shrink-0"
              >
                OPTIONS
              </button>
            ) : (
              <button
                type="button"
                onClick={handleAddClick}
                className="inline-flex items-center justify-center gap-1 px-3 sm:px-4 py-1.5 rounded-lg bg-[#ff6b00] hover:bg-[#e55f00] text-white text-[10px] sm:text-xs font-extrabold transition-all duration-150 cursor-pointer shadow-2xs active:scale-95 shrink-0"
              >
                <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[3]" />
                ADD
              </button>
            )
          ) : (
            <div className="inline-flex items-center bg-[#0b1d3a] text-white rounded-lg p-0.5 sm:p-1 shadow-xs shrink-0">
              <button
                type="button"
                onClick={handleDecrement}
                className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center rounded hover:bg-white/20 active:scale-90 text-white transition-colors cursor-pointer"
                title="Decrease quantity"
              >
                <Minus className="w-2.5 h-2.5 sm:w-3 sm:h-3 stroke-[3]" />
              </button>
              <span className="w-4 sm:w-6 text-center text-[10px] sm:text-xs font-bold font-mono">
                {quantity}
              </span>
              <button
                type="button"
                onClick={handleIncrement}
                className="w-5 h-5 flex items-center justify-center rounded hover:bg-white/20 active:scale-90 text-white transition-colors cursor-pointer"
                title="Increase quantity"
              >
                <Plus className="w-2.5 h-2.5 stroke-[3]" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Variation selector modal */}
      {product.has_options && (
        <ProductOptionsModal
          product={product}
          isOpen={isOptionsOpen}
          onClose={() => setIsOptionsOpen(false)}
          currentOptionId={selectedOption?.id}
          onSelectOption={(opt) => {
            setSelectedOption(opt);
            addToCart(product, opt.id, 1);
          }}
        />
      )}
    </>
  );
};
