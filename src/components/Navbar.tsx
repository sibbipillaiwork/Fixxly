import React from 'react';
import { useCart } from '../context/CartContext';
import { Zap, MapPin, ShoppingBag, Smartphone, ChevronDown, Wifi, Battery, Signal, Search, Mic, Camera } from 'lucide-react';

interface NavbarProps {
  children?: React.ReactNode;
  onOpenCart: () => void;
  isMobilePreview: boolean;
  onToggleMobilePreview: () => void;
  onTriggerSearchMobile?: () => void;
  currentQuery?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  children,
  onOpenCart,
  isMobilePreview,
  onToggleMobilePreview,
  onTriggerSearchMobile,
  currentQuery = ''
}) => {
  const { totalCount, totalAmount } = useCart();

  // If in Mobile Preview mode, render mobile-specific structure inside the device frame
  if (isMobilePreview) {
    return (
      <header className="bg-[#0b1d3a] text-white shadow-md w-full shrink-0">
        {/* Smartphone Status Bar (Dynamic Island style) */}
        <div className="pt-2 px-5 pb-1 flex items-center justify-between text-[11px] text-white/90 select-none">
          <span className="font-bold tracking-tight font-mono">9:41</span>
          <div className="w-20 h-4 bg-black rounded-full mx-auto" />
          <div className="flex items-center gap-1.5 text-white/80">
            <Signal className="w-3 h-3" />
            <Wifi className="w-3 h-3" />
            <Battery className="w-3.5 h-3.5 fill-current" />
          </div>
        </div>

        {/* Mobile Top Header (Row 1: Brand & Location & Cart) */}
        <div className="px-3 py-2 flex items-center justify-between gap-2 border-b border-white/10">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-7 h-7 rounded-lg bg-[#ff6b00] flex items-center justify-center text-white shadow-xs font-black text-sm shrink-0">
              <Zap className="w-4 h-4 fill-current" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1">
                <span className="text-base font-black tracking-tight text-white leading-none">
                  fixxly<span className="text-[#ff6b00]">.in</span>
                </span>
                <span className="text-[9px] font-bold bg-[#ff6b00] text-white px-1 rounded">30M</span>
              </div>
              <div className="flex items-center gap-1 text-[10px] text-orange-200 mt-0.5 truncate">
                <MapPin className="w-2.5 h-2.5 text-[#ff6b00] shrink-0" />
                <span className="truncate">JP Nagar 560078</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={onOpenCart}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#ff6b00] hover:bg-[#e55f00] text-white font-extrabold text-xs shadow-xs transition-colors cursor-pointer"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span className="font-mono text-xs">
                {totalCount > 0 ? `₹${totalAmount}` : 'Cart'}
              </span>
              {totalCount > 0 && (
                <span className="bg-[#0b1d3a] text-[10px] px-1 rounded-full font-black">
                  {totalCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Input Trigger */}
        <div className="p-2.5 bg-[#0b1d3a]">
          <div
            onClick={onTriggerSearchMobile}
            className="flex items-center justify-between bg-white text-gray-500 px-3 py-2 rounded-xl shadow-inner cursor-pointer hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-2 min-w-0">
              <Search className="w-4 h-4 text-[#ff6b00] shrink-0" />
              <span className="text-xs font-semibold truncate text-gray-600">
                {currentQuery ? currentQuery : 'Search...'}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-400 shrink-0">
              <Mic className="w-3.5 h-3.5 hover:text-[#ff6b00]" />
              <Camera className="w-3.5 h-3.5 hover:text-[#ff6b00]" />
            </div>
          </div>
        </div>
      </header>
    );
  }

  // Standard Desktop / Tablet Navigation
  return (
    <header className="sticky top-0 z-40 bg-[#0b1d3a] text-white shadow-md border-b border-navy-dark w-full">
      {/* Top Trade Utility Bar */}
      <div className="bg-[#071326] px-4 py-1.5 text-[11px] text-gray-300 flex items-center justify-between border-b border-white/5">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 font-semibold text-[#ff6b00]">
            <Zap className="w-3 h-3 fill-current" />
            30-Min Express Trade Delivery
          </span>
          <span className="hidden md:inline text-gray-500">•</span>
          <span className="hidden md:inline text-gray-300">
            Wholesale contractor rates & 100% genuine manufacturer warranty
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span className="hidden sm:flex items-center gap-1 text-gray-300">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            Express Delivery Active • Bengaluru 560078 (28 Mins)
          </span>

          {/* Device Viewport Preview Switcher */}
          <button
            type="button"
            onClick={onToggleMobilePreview}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#ff6b00] hover:bg-[#e55f00] text-[11px] text-white font-bold transition-all shadow-xs cursor-pointer active:scale-95"
            title="Toggle between Desktop and Mobile mWeb view"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Preview Mobile mWeb (390px)</span>
          </button>
        </div>
      </div>

      {/* Main Brand Bar */}
      <div className="max-w-7xl xl:max-w-[1440px] 2xl:max-w-[1600px] mx-auto px-4 sm:px-8 py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center justify-between gap-3">
          {/* Brand Logo & Location */}
          <div className="flex items-center gap-4 shrink-0">
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="w-9 h-9 rounded-xl bg-[#ff6b00] flex items-center justify-center text-white shadow-md shadow-orange-600/30 font-black text-xl">
                <Zap className="w-5 h-5 fill-current" />
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center">
                  fixxly<span className="text-[#ff6b00]">.in</span>
                </span>
                <span className="text-[9px] font-bold uppercase tracking-widest text-orange-300 block -mt-1">
                  Trade & Materials
                </span>
              </div>
            </div>

            {/* Location / Delivery Hub Chip */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 cursor-pointer transition-colors">
              <MapPin className="w-4 h-4 text-[#ff6b00]" />
              <div className="text-left text-xs leading-tight">
                <div className="font-bold flex items-center gap-1">
                  <span>Bengaluru 560078</span>
                  <ChevronDown className="w-3 h-3 text-gray-400" />
                </div>
                <span className="text-[10px] text-gray-300">
                  JP Nagar Hub • 28 Mins Express
                </span>
              </div>
            </div>
          </div>

          {/* Mobile Cart Button visible only on small screens */}
          <div className="md:hidden">
            <button
              type="button"
              onClick={onOpenCart}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#ff6b00] hover:bg-[#e55f00] text-white font-extrabold text-xs shadow-md"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{totalCount > 0 ? `₹${totalAmount}` : 'Cart'}</span>
            </button>
          </div>
        </div>

        {/* Central Search Bar Container - Enlarged Desktop Width */}
        <div className="flex-1 max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-[960px] 2xl:max-w-[1080px] relative w-full">
          {children}
        </div>

        {/* Desktop Right Actions: Cart Button */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenCart}
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#ff6b00] hover:bg-[#e55f00] text-white font-extrabold text-xs sm:text-sm shadow-md transition-all duration-150 cursor-pointer active:scale-95"
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5" />
              {totalCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#0b1d3a] text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-white">
                  {totalCount}
                </span>
              )}
            </div>
            <div className="text-left leading-tight">
              <div className="text-[10px] text-orange-200 uppercase font-semibold">
                Cart
              </div>
              <div className="font-mono text-xs">
                {totalCount > 0 ? `₹${totalAmount}` : 'My Cart'}
              </div>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
