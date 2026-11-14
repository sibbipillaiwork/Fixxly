import React, { useRef, useState, useEffect } from 'react';
import { SearchApiResponse } from '../services/searchEngine';
import { ProductItem, PRODUCTS_CATALOG, POPULAR_SEARCH_TERMS } from '../data/products';
import { AutoCorrectionBanner } from './AutoCorrectionBanner';
import { SolutionBundleCard } from './SolutionBundleCard';
import { ProductCard } from './ProductCard';
import { SearchDropdownSkeleton } from './SkeletonLoader';
import {
  TrendingUp,
  History,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ArrowRight
} from 'lucide-react';

interface SearchDropdownProps {
  isOpen: boolean;
  searchResponse: SearchApiResponse | null;
  isLoading: boolean;
  query: string;
  isBypassed: boolean;
  onToggleCorrection: () => void;
  onSelectSearchTerm: (term: string) => void;
  selectedCategory: string | null;
  onSelectCategory: (catId: string | null) => void;
  onViewAllClick?: () => void;
  recentSearches: string[];
  onClearRecent: () => void;
  selectedTradeRole?: string;
  onSelectTradeRole?: (role: any) => void;
  recommendedProducts?: ProductItem[];
}

export const SearchDropdown: React.FC<SearchDropdownProps> = ({
  isOpen,
  searchResponse,
  isLoading,
  query,
  isBypassed,
  onToggleCorrection,
  onSelectSearchTerm,
  selectedCategory,
  onSelectCategory,
  onViewAllClick,
  recentSearches,
  onClearRecent,
  selectedTradeRole: _selectedTradeRole = 'All',
  onSelectTradeRole: _onSelectTradeRole,
  recommendedProducts
}) => {
  if (!isOpen) return null;

  const hasQuery = query.trim().length > 0;

  // Filter products by selectedCategory if active
  let displayedItems: ProductItem[] = [];
  if (searchResponse?.items) {
    displayedItems = selectedCategory
      ? searchResponse.items.filter(item => item.categoryId === selectedCategory)
      : searchResponse.items;
  }

  // 3. Recommended Products for You in Search Bar (based on recent searches)
  const displayRecommended = React.useMemo(() => {
    if (recommendedProducts && recommendedProducts.length > 0) {
      return recommendedProducts;
    }
    const targetTerms = recentSearches.slice(0, 3);
    if (targetTerms.length === 0) return PRODUCTS_CATALOG.slice(0, 6);

    const seenIds = new Set<string>();
    const results: ProductItem[] = [];

    for (const term of targetTerms) {
      const clean = term.toLowerCase().trim();
      const tokens = clean.split(/\s+/).filter((t) => t.length > 1);
      for (const p of PRODUCTS_CATALOG) {
        if (seenIds.has(p.id)) continue;
        const text = (
          p.name + ' ' +
          p.tags.join(' ') + ' ' +
          p.category + ' ' +
          p.spec + ' ' +
          (p.description || '')
        ).toLowerCase();
        if (tokens.some((t) => text.includes(t)) || text.includes(clean)) {
          seenIds.add(p.id);
          results.push(p);
        }
      }
    }
    if (results.length < 4) {
      for (const p of PRODUCTS_CATALOG) {
        if (!seenIds.has(p.id)) {
          seenIds.add(p.id);
          results.push(p);
          if (results.length >= 6) break;
        }
      }
    }
    return results.slice(0, 6);
  }, [recommendedProducts, recentSearches]);

  // 7-Second Auto-Scroll for Recommended For You track
  const recScrollRef = useRef<HTMLDivElement>(null);
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    if (!isOpen || hasQuery || isInteracting) return;

    const timer = setInterval(() => {
      if (recScrollRef.current) {
        const container = recScrollRef.current;
        const scrollStep = 230;
        const maxScroll = container.scrollWidth - container.clientWidth;

        if (container.scrollLeft >= maxScroll - 15) {
          container.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          container.scrollBy({ left: scrollStep, behavior: 'smooth' });
        }
      }
    }, 7000);

    return () => clearInterval(timer);
  }, [isOpen, hasQuery, isInteracting]);

  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-dropdown border border-[#e5e7eb] overflow-hidden z-40 animate-slide-down max-h-[85vh] w-full min-w-0 flex flex-col transition-all duration-200">
      
      {/* ------------------------------------------------------------- */}
      {/* 1. Empty Query State (Show Recent, Popular & Recommended) */}
      {/* ------------------------------------------------------------- */}
      {!hasQuery && (
        <div className="p-4 overflow-y-auto space-y-4">
          
          {/* SECTION 1: RECENT SEARCHES */}
          {recentSearches.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-blue-50 text-[#0b1d3a] flex items-center justify-center text-[10px] font-black">
                    1
                  </span>
                  <History className="w-3.5 h-3.5 text-gray-400" />
                  Recent Searches
                </span>
                <button
                  type="button"
                  onClick={onClearRecent}
                  className="text-xs text-gray-400 hover:text-gray-700 cursor-pointer transition-colors"
                >
                  Clear All
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => onSelectSearchTerm(term)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 hover:bg-orange-50 hover:text-[#ff6b00] border border-gray-200 hover:border-orange-200 text-xs font-medium text-gray-700 transition-colors cursor-pointer"
                  >
                    <span>{term}</span>
                    <History className="w-3 h-3 text-gray-400" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* SECTION 2: POPULAR SEARCHES */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-orange-50 text-[#ff6b00] flex items-center justify-center text-[10px] font-black">
                  2
                </span>
                <TrendingUp className="w-3.5 h-3.5 text-[#ff6b00]" />
                Popular Searches
              </span>
              <span className="text-[11px] text-gray-400">Trending Contractor Prompts</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {POPULAR_SEARCH_TERMS.map((item) => (
                <button
                  key={item.term}
                  type="button"
                  onClick={() => onSelectSearchTerm(item.term)}
                  className="p-2.5 text-left rounded-xl border border-gray-200 hover:border-[#ff6b00] hover:bg-orange-50/40 transition-all cursor-pointer group shadow-2xs"
                >
                  <div className="text-xs font-bold text-[#0b1d3a] group-hover:text-[#ff6b00] line-clamp-1">
                    "{item.term}"
                  </div>
                  <div className="text-[10px] text-gray-400 mt-0.5">
                    {item.note}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* SECTION 3: RECOMMENDED FOR YOU (Auto-scrolls every 7 seconds • Pauses on hover) */}
          <div className="pt-3 border-t border-gray-100">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center text-[10px] font-black">
                  3
                </span>
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                Recommended For You
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => recScrollRef.current?.scrollBy({ left: -230, behavior: 'smooth' })}
                  className="p-1 rounded-md bg-gray-100 hover:bg-orange-50 text-gray-600 hover:text-[#ff6b00] transition-colors cursor-pointer"
                  title="Previous"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => recScrollRef.current?.scrollBy({ left: 230, behavior: 'smooth' })}
                  className="p-1 rounded-md bg-gray-100 hover:bg-orange-50 text-gray-600 hover:text-[#ff6b00] transition-colors cursor-pointer"
                  title="Next"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Horizontal scroll of recommended product cards with images & details */}
            <div
              ref={recScrollRef}
              onMouseEnter={() => setIsInteracting(true)}
              onMouseLeave={() => setIsInteracting(false)}
              onTouchStart={() => setIsInteracting(true)}
              onTouchEnd={() => setIsInteracting(false)}
              className="flex gap-3 overflow-x-auto no-scrollbar pb-3 pt-1 -mx-1 px-1 snap-x snap-mandatory scroll-smooth"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {displayRecommended.map((product: ProductItem) => (
                <div
                  key={product.id}
                  className="w-48 sm:w-56 shrink-0 snap-start flex flex-col"
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 2. Loading State (Zero Layout Shift Skeletons) */}
      {/* ------------------------------------------------------------- */}
      {hasQuery && isLoading && (
        <SearchDropdownSkeleton />
      )}

      {/* ------------------------------------------------------------- */}
      {/* 3. Query Results */}
      {/* ------------------------------------------------------------- */}
      {hasQuery && !isLoading && searchResponse && (
        <div className="flex-1 overflow-y-auto min-h-0 divide-y divide-gray-100">
          
          {/* Top Banner: Did-You-Mean Auto-Correction Banner */}
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
            <div className="p-3 bg-amber-50/40">
              <SolutionBundleCard bundle={searchResponse.solution_bundle} />
            </div>
          )}

          {/* Category Quick Chips */}
          {searchResponse.suggested_categories.length > 1 && (
            <div className="px-3 py-2 bg-gray-50 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              <span className="text-[11px] font-bold text-gray-500 uppercase shrink-0 mr-1">
                Filter:
              </span>
              <button
                type="button"
                onClick={() => onSelectCategory(null)}
                className={`shrink-0 text-xs px-2.5 py-1 rounded-full font-semibold transition-all cursor-pointer ${
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
                  className={`shrink-0 text-xs px-2.5 py-1 rounded-full font-semibold transition-all cursor-pointer ${
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

          {/* Product Results Grid (Spacious 2-Column Clean Layout) */}
          <div className="p-3">
            <div className="flex items-center justify-between mb-2.5 px-0.5">
              <span className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-green-50 text-green-700 flex items-center justify-center text-[10px] font-black">
                  3
                </span>
                Search Results ({displayedItems.length})
              </span>
              <span className="text-[11px] font-semibold text-green-700 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                In Stock • 30-Min Delivery (560078)
              </span>
            </div>

            {displayedItems.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {displayedItems.slice(0, 6).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="py-8 text-center text-gray-500">
                <p className="text-xs">No products in this specific category.</p>
                <button
                  type="button"
                  onClick={() => onSelectCategory(null)}
                  className="mt-2 text-xs font-bold text-[#ff6b00] underline"
                >
                  View all categories ({searchResponse.items.length})
                </button>
              </div>
            )}

            {/* Bottom View All SRP Button on Desktop Dropdown */}
            {onViewAllClick && displayedItems.length > 0 && (
              <div className="mt-3 pt-2.5 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs text-gray-500">
                  Showing top products for "{query}"
                </span>
                <button
                  type="button"
                  onClick={onViewAllClick}
                  className="px-4 py-1.5 rounded-lg bg-[#0b1d3a] hover:bg-navy-dark text-white text-xs font-bold inline-flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                >
                  <span>View All {displayedItems.length} Results on Full Page (↵)</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#ff6b00]" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
