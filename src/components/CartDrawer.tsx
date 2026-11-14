import React from 'react';
import { useCart } from '../context/CartContext';
import { X, Plus, Minus, Zap, ArrowRight, ShoppingBag } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    items,
    updateQuantity,
    totalCount,
    totalAmount,
    totalMrp,
    totalSavings,
    isCartOpen,
    setIsCartOpen
  } = useCart();

  if (!isCartOpen) return null;

  const cartList = Object.values(items);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs animate-fade-in">
      <div 
        className="fixed inset-y-0 right-0 max-w-full flex pl-10"
        onClick={() => setIsCartOpen(false)}
      >
        <div 
          className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between animate-slide-down"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-[#0b1d3a] text-white">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-white/10 text-[#ff6b00]">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold">Your Fixxly Cart</h2>
                <span className="text-xs text-orange-200">
                  {totalCount} item{totalCount !== 1 ? 's' : ''} • Bengaluru 560078
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Delivery Promise Pill */}
          <div className="px-4 py-2.5 bg-green-50 border-b border-green-200 flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 font-semibold text-green-800">
              <Zap className="w-4 h-4 text-[#ff6b00] fill-[#ff6b00]" />
              <span>30-Min Fast Express Delivery Guaranteed</span>
            </div>
            <span className="font-bold text-green-700">FREE</span>
          </div>

          {/* Cart Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {cartList.length === 0 ? (
              <div className="py-16 text-center text-gray-500">
                <ShoppingBag className="w-12 h-12 mx-auto mb-3 text-gray-300 stroke-1" />
                <p className="text-sm font-semibold text-gray-700">Your cart is empty</p>
                <p className="text-xs text-gray-400 mt-1">
                  Search for trade products like "pipe ka ring" or "pidipruf" to add materials
                </p>
              </div>
            ) : (
              cartList.map((entry) => (
                <div
                  key={entry.product.id}
                  className="flex gap-3 p-3 rounded-xl border border-gray-100 hover:border-gray-200 bg-white shadow-2xs"
                >
                  <img
                    src={entry.product.image}
                    alt={entry.product.name}
                    className="w-16 h-16 rounded-lg object-cover border border-gray-100 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider">
                      {entry.product.brand}
                    </div>
                    <h4 className="text-xs font-semibold text-gray-900 line-clamp-1">
                      {entry.product.name}
                    </h4>
                    <span className="text-[11px] text-gray-500 block">
                      {entry.selectedOptionLabel || entry.product.spec}
                    </span>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-xs font-extrabold text-green-700">
                          ₹{entry.unitPrice * entry.quantity}
                        </span>
                        <span className="text-[10px] text-gray-400 line-through">
                          ₹{entry.unitMrp * entry.quantity}
                        </span>
                      </div>

                      <div className="inline-flex items-center bg-gray-100 rounded-lg p-0.5 border border-gray-200">
                        <button
                          type="button"
                          onClick={() => updateQuantity(entry.product.id, entry.quantity - 1)}
                          className="w-5 h-5 flex items-center justify-center rounded text-gray-600 hover:bg-white transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-bold font-mono">
                          {entry.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(entry.product.id, entry.quantity + 1)}
                          className="w-5 h-5 flex items-center justify-center rounded text-gray-600 hover:bg-white transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Summary */}
          {cartList.length > 0 && (
            <div className="p-4 border-t border-gray-100 bg-gray-50/80 space-y-3">
              <div className="space-y-1 text-xs">
                <div className="flex justify-between text-gray-600">
                  <span>Item Total (MRP)</span>
                  <span className="font-mono">₹{totalMrp}</span>
                </div>
                <div className="flex justify-between text-green-700 font-semibold">
                  <span>Contractor Trade Discount</span>
                  <span className="font-mono">-₹{totalSavings}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Partner Fee (30 Mins)</span>
                  <span className="text-green-700 font-semibold uppercase">FREE</span>
                </div>
                <div className="pt-2 border-t border-gray-200 flex justify-between text-sm font-extrabold text-[#0b1d3a]">
                  <span>To Pay</span>
                  <span className="text-base text-green-700 font-mono">₹{totalAmount}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => alert(`Order placed for 30-min express dispatch! Total: ₹${totalAmount}`)}
                className="w-full py-3 px-4 rounded-xl bg-[#ff6b00] hover:bg-[#e55f00] active:scale-[0.99] text-white font-extrabold text-sm flex items-center justify-between shadow-md transition-all cursor-pointer"
              >
                <span>Proceed to Express Checkout</span>
                <div className="flex items-center gap-1">
                  <span>₹{totalAmount}</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
