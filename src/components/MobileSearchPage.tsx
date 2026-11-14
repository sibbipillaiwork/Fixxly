import React, { useState, useEffect, useRef } from 'react';
import { SearchApiResponse } from '../services/searchEngine';
import { ProductItem, POPULAR_SEARCH_TERMS } from '../data/products';
import { AutoCorrectionBanner } from './AutoCorrectionBanner';
import { SolutionBundleCard } from './SolutionBundleCard';
import { ProductCard } from './ProductCard';
import { SearchDropdownSkeleton } from './SkeletonLoader';
import { TradeRole } from './TradeRoleFilterBar';
import {
  Search,
  X,
  Mic,
  Camera,
  ArrowLeft,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface MobileSearchPageProps {
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
  onOpenVoice: () => void;
  onOpenPhoto: () => void;
  recentSearches: string[];
  onClearRecent: () => void;
  isInsideFrame?: boolean;
  selectedTradeRole?: TradeRole;
  onSelectTradeRole?: (role: TradeRole) => void;
}

export const MobileSearchPage: React.FC<MobileSearchPageProps> = ({
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
  recentSearches,
  onClearRecent,
  isInsideFrame = false,
  selectedTradeRole: _selectedTradeRole = 'All',
  onSelectTradeRole: _onSelectTradeRole
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [showAllResults, setShowAllResults] = useState(false);

  // Focus input when page opens
  useEffect(() => {
    if (isOpen) {
      setShowAllResults(false);
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const hasQuery = query.trim().length > 0;

  // Filter products by selectedCategory if active
  let displayedItems: ProductItem[] = [];
  if (searchResponse?.items) {
    displayedItems = selectedCategory
      ? searchResponse.items.filter((item) => item.categoryId === selectedCategory)
      : searchResponse.items;
  }

  // Show top 10 items initially, expand on "View All"
  const visibleItems = showAllResults ? displayedItems : displayedItems.slice(0, 10);
  const isOverTen = displayedItems.length > 10;

  return (
    <div
      className={`bg-white z-50 flex flex-col font-sans transition-transform duration-200 ease-out ${
        isInsideFrame
          ? 'absolute inset-0 w-full h-full'
          : 'fixed inset-0 w-full h-full'
      }`}
    >
      {/* Top Mobile Sticky Search Header */}
      <header className="sticky top-0 bg-white border-b border-gray-200 px-3 py-2.5 z-10 flex items-center gap-2 shadow-xs">
        <button
          type="button"
          onClick={onClose}
          className="p-1.5 -ml-1 text-[#0b1d3a] hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
          title="Go back"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>

        {/* Input Bar */}
        <div className="flex-1 flex items-center bg-gray-100 rounded-xl px-2.5 border border-transparent focus-within:border-[#ff6b00] focus-within:bg-white focus-within:ring-2 focus-within:ring-orange-100 transition-all">
          <Search className="w-4 h-4 text-[#ff6b00] shrink-0 mr-2" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search..."
            className="w-full py-2.5 text-xs font-semibold text-[#111827] placeholder:text-gray-400 bg-transparent outline-none truncate"
          />

          <div className="flex items-center gap-1 pr-2 shrink-0">
            {query && (
              <button
                type="button"
                onClick={() => {
                  onClear();
                  inputRef.current?.focus();
                }}
                className="p-1 rounded-full text-gray-400 hover:text-gray-700 cursor-pointer"
                title="Clear"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            <button
              type="button"
              onClick={onOpenVoice}
              className="p-1.5 text-gray-500 hover:text-[#ff6b00] cursor-pointer"
              title="Voice Search"
            >
              <Mic className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={onOpenPhoto}
              className="p-1.5 text-gray-500 hover:text-[#ff6b00] cursor-pointer"
              title="Photo / Hardware Scanner"
            >
              <Camera className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Scrollable Content */}
      <div className="flex-1 overflow-y-auto divide-y divide-gray-200/80 pb-20">
        
        {/* ========================================================= */}
        {/* WHEN QUERY IS ACTIVE: DIRECT SEARCH RESULTS AT THE TOP    */}
        {/* ========================================================= */}
        {hasQuery && (
          <section className="p-3 bg-[#f8f9fa] space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-800">
                Search Results for "{query}"
              </h3>
              <span className="text-[10px] font-semibold text-green-700 bg-green-50 px-2 py-0.5 rounded-full border border-green-200">
                30-Min Delivery
              </span>
            </div>

            {/* Loading Skeletons */}
            {isLoading && <SearchDropdownSkeleton />}

            {/* When Query is Active & Results Ready */}
            {!isLoading && searchResponse && (
              <>
                {/* Clean Google-style Did-You-Mean notice */}
                {searchResponse.did_you_mean_triggered && searchResponse.display_corrected_term && (
                  <AutoCorrectionBanner
                    originalQuery={query}
                    resolvedTerm={searchResponse.display_corrected_term}
                    isBypassed={isBypassed}
                    onToggleCorrection={onToggleCorrection}
                    executionTimeMs={searchResponse.execution_time_ms}
                  />
                )}

                {/* Pinned Solution Bundle (if matched) */}
                {searchResponse.solution_bundle && (
                  <div>
                    <SolutionBundleCard bundle={searchResponse.solution_bundle} />
                  </div>
                )}

                {/* Category Filter Chips */}
                {searchResponse.suggested_categories.length > 0 && (
                  <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
                    <button
                      type="button"
                      onClick={() => onSelectCategory(null)}
                      className={`shrink-0 text-[11px] px-2.5 py-1 rounded-full font-bold transition-all cursor-pointer ${
                        selectedCategory === null
                          ? 'bg-[#0b1d3a] text-white shadow-xs'
                          : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      All ({searchResponse.total_results})
                    </button>
                    {searchResponse.suggested_categories.map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => onSelectCategory(selectedCategory === c.id ? null : c.id)}
                        className={`shrink-0 text-[11px] px-2.5 py-1 rounded-full font-bold transition-all cursor-pointer ${
                          selectedCategory === c.id
                            ? 'bg-[#0b1d3a] text-white shadow-xs'
                            : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {c.name} ({c.count})
                      </button>
                    ))}
                  </div>
                )}

                {/* Product Cards Grid: 2 columns on mobile */}
                {displayedItems.length > 0 ? (
                  <div>
                    <div className="grid grid-cols-2 gap-2">
                      {visibleItems.map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>

                    {/* View All Button if > 10 Results */}
                    {isOverTen && (
                      <div className="mt-3">
                        {!showAllResults ? (
                          <button
                            type="button"
                            onClick={() => setShowAllResults(true)}
                            className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-orange-50 border border-[#e5e7eb] hover:border-[#ff6b00] text-xs font-bold text-[#0b1d3a] hover:text-[#ff6b00] shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                          >
                            <span>View All {displayedItems.length} Results</span>
                            <ChevronDown className="w-4 h-4 text-[#ff6b00]" />
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setShowAllResults(false)}
                            className="w-full py-2 px-4 rounded-xl bg-gray-100 hover:bg-gray-200 border border-gray-200 text-xs font-semibold text-gray-700 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <span>Show Top 10 Products</span>
                            <ChevronUp className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-6 text-center bg-white rounded-xl border border-gray-200">
                    <p className="text-xs font-semibold text-gray-700">No products found in this category.</p>
                    <button
                      type="button"
                      onClick={() => onSelectCategory(null)}
                      className="mt-2 text-xs font-bold text-[#ff6b00] hover:underline"
                    >
                      View all matching products ({searchResponse.items.length})
                    </button>
                  </div>
                )}
              </>
            )}
          </section>
        )}

        {/* ========================================================= */}
        {/* WHEN NO QUERY: SHOW RECENT SEARCHES & POPULAR SEARCHES    */}
        {/* ========================================================= */}
        {!hasQuery && (
          <>
            {/* SECTION 1: RECENT SEARCHES */}
            {recentSearches.length > 0 && (
              <section className="p-3 bg-white">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-700">
                    Recent Searches
                  </h3>
                  <button
                    type="button"
                    onClick={onClearRecent}
                    className="text-[11px] font-semibold text-gray-400 hover:text-gray-700 cursor-pointer transition-colors"
                  >
                    Clear All
                  </button>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {recentSearches.map((term) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => onSelectSearchTerm(term)}
                      className="inline-flex items-center px-2.5 py-1 rounded-full bg-gray-100 hover:bg-orange-50 hover:text-[#ff6b00] hover:border-orange-200 border border-gray-200 text-xs font-medium text-gray-700 transition-all cursor-pointer"
                    >
                      <span className="truncate max-w-[140px]">{term}</span>
                    </button>
                  ))}
                </div>
              </section>
            )}

            {/* SECTION 2: POPULAR SEARCHES */}
            <section className="p-3 bg-white">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-700">
                  Popular Searches
                </h3>
                <span className="text-[10px] text-gray-400 font-medium">Top Contractor Prompts</span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {POPULAR_SEARCH_TERMS.map((item) => (
                  <button
                    key={item.term}
                    type="button"
                    onClick={() => onSelectSearchTerm(item.properName)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-50 hover:bg-orange-50 border border-gray-200 hover:border-orange-300 text-xs font-bold text-gray-800 hover:text-[#ff6b00] transition-all cursor-pointer group shadow-2xs"
                  >
                    <span>{item.properName}</span>
                  </button>
                ))}
              </div>
            </section>
          </>
        )}

      </div>
    </div>
  );
};
