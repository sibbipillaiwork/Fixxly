import React, { useRef, useEffect } from 'react';
import { SearchApiResponse } from '../services/searchEngine';
import { ProductItem } from '../data/products';
import { AutoCorrectionBanner } from './AutoCorrectionBanner';
import { SolutionBundleCard } from './SolutionBundleCard';
import { ProductCard } from './ProductCard';
import { SearchDropdownSkeleton } from './SkeletonLoader';
import { POPULAR_SEARCH_TERMS } from '../data/products';
import { Search, X, Mic, Camera, ArrowLeft, TrendingUp, History } from 'lucide-react';

interface MobileSearchDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  query: string;
  onQueryChange: (val: string) => void;
  onClear: () => void;
  searchResponse: SearchApiResponse | null;
  isLoading: boolean;
  isBypassed: boolean;
  onToggleCorrection: () => void;
  onSelectSearchTerm: (term: string) => void;
  selectedCategory: string | null;
  onSelectCategory: (catId: string | null) => void;
  onViewAllClick?: () => void;
  onOpenVoice: () => void;
  onOpenPhoto: () => void;
  recentSearches: string[];
}

export const MobileSearchDrawer: React.FC<MobileSearchDrawerProps> = ({
  isOpen,
  onClose,
  query,
  onQueryChange,
  onClear,
  searchResponse,
  isLoading,
  isBypassed,
  onToggleCorrection,
  onSelectSearchTerm,
  selectedCategory,
  onSelectCategory,
  onOpenVoice,
  onOpenPhoto,
  recentSearches
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const hasQuery = query.trim().length > 0;

  let displayedItems: ProductItem[] = [];
  if (searchResponse?.items) {
    displayedItems = selectedCategory
      ? searchResponse.items.filter(item => item.categoryId === selectedCategory)
      : searchResponse.items;
  }

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center animate-fade-in sm:p-4"
      onClick={onClose}
    >
      <div 
        className="w-full h-full sm:max-w-md sm:h-[92vh] sm:rounded-2xl sm:shadow-2xl sm:border sm:border-gray-200 bg-[#f8f9fa] flex flex-col overflow-hidden animate-slide-down relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Top Header with Search Input */}
        <div className="bg-[#0b1d3a] p-3 pb-3 text-white flex items-center gap-2 shadow-md shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            title="Back to home"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="relative flex-1 flex items-center bg-white rounded-xl shadow-inner">
            <div className="pl-3 pr-2 flex items-center pointer-events-none text-gray-400">
              <Search className="w-4 h-4 text-[#ff6b00]" />
            </div>

            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder='Search "pipe ka ring", "pidipruf"...'
              className="w-full py-2.5 text-xs font-medium text-[#111827] placeholder:text-[#6b7280] bg-transparent outline-none truncate"
            />

            <div className="flex items-center gap-1 pr-2">
              {query && (
                <button
                  type="button"
                  onClick={onClear}
                  className="p-1 rounded-full text-gray-400 hover:text-gray-700 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}

              <button
                type="button"
                onClick={onOpenVoice}
                className="p-1 text-gray-500 hover:text-[#ff6b00] cursor-pointer"
              >
                <Mic className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onOpenPhoto}
                className="p-1 text-gray-500 hover:text-[#ff6b00] cursor-pointer"
              >
                <Camera className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto">
        
        {/* Empty State */}
        {!hasQuery && (
          <div className="p-4 space-y-4">
            {recentSearches.length > 0 && (
              <div>
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1 mb-2">
                  <History className="w-3.5 h-3.5 text-gray-400" />
                  Recent Searches
                </span>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map(term => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => onSelectSearchTerm(term)}
                      className="px-3 py-1.5 rounded-full bg-white border border-gray-200 text-xs font-medium text-gray-800"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div>
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1 mb-2">
                <TrendingUp className="w-3.5 h-3.5 text-[#ff6b00]" />
                Popular Trade Slang Queries
              </span>
              <div className="grid grid-cols-2 gap-2">
                {POPULAR_SEARCH_TERMS.map(item => (
                  <button
                    key={item.term}
                    type="button"
                    onClick={() => onSelectSearchTerm(item.term)}
                    className="p-2.5 text-left rounded-xl bg-white border border-gray-200"
                  >
                    <div className="text-xs font-bold text-[#0b1d3a] line-clamp-1">
                      "{item.term}"
                    </div>
                    <div className="text-[10px] text-gray-400">
                      {item.note}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Loading Skeletons */}
        {hasQuery && isLoading && (
          <SearchDropdownSkeleton />
        )}

        {/* Search Results */}
        {hasQuery && !isLoading && searchResponse && (
          <div className="pb-20">
            {/* Auto-Correction Banner */}
            {searchResponse.did_you_mean_triggered && searchResponse.display_corrected_term && (
              <AutoCorrectionBanner
                originalQuery={query}
                resolvedTerm={searchResponse.display_corrected_term}
                isBypassed={isBypassed}
                onToggleCorrection={onToggleCorrection}
                executionTimeMs={searchResponse.execution_time_ms}
              />
            )}

            {/* Pinned Solution Bundle */}
            {searchResponse.solution_bundle && (
              <SolutionBundleCard bundle={searchResponse.solution_bundle} />
            )}

            {/* Category Quick Chips on Mobile */}
            {searchResponse.suggested_categories.length > 0 && (
              <div className="px-3 py-1 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                <button
                  type="button"
                  onClick={() => onSelectCategory(null)}
                  className={`shrink-0 text-[11px] px-2.5 py-1 rounded-full font-semibold transition-all ${
                    selectedCategory === null
                      ? "bg-[#0b1d3a] text-white"
                      : "bg-white text-gray-700 border border-gray-200"
                  }`}
                >
                  All ({searchResponse.total_results})
                </button>
                {searchResponse.suggested_categories.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => onSelectCategory(selectedCategory === c.id ? null : c.id)}
                    className={`shrink-0 text-[11px] px-2.5 py-1 rounded-full font-semibold transition-all ${
                      selectedCategory === c.id
                        ? "bg-[#0b1d3a] text-white"
                        : "bg-white text-gray-700 border border-gray-200"
                    }`}
                  >
                    {c.name} ({c.count})
                  </button>
                ))}
              </div>
            )}

            {/* Matching SKUs */}
            <div className="p-3">
              <div className="flex items-center justify-between mb-2 px-1">
                <span className="text-xs font-bold text-gray-500 uppercase">
                  Products ({displayedItems.length})
                </span>
                <span className="text-[11px] font-semibold text-green-700">
                  30-Min Delivery
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {displayedItems.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      </div>
    </div>
  );
};
