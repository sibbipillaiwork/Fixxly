import React, { useState, useEffect, useRef } from 'react';
import { useDebounce } from './hooks/useDebounce';
import { TradeSearchService, SearchApiResponse } from './services/searchEngine';
import { Navbar } from './components/Navbar';
import { SearchBar } from './components/SearchBar';
import { SearchDropdown } from './components/SearchDropdown';
import { MobileSearchPage } from './components/MobileSearchPage';
import { CartDrawer } from './components/CartDrawer';
import { VoiceSearchModal } from './components/VoiceSearchModal';
import { CameraSearchModal } from './components/CameraSearchModal';
import { ProductCard } from './components/ProductCard';
import { SolutionBundleCard } from './components/SolutionBundleCard';
import { AutoCorrectionBanner } from './components/AutoCorrectionBanner';
import { TradeRoleFilterBar, TradeRole } from './components/TradeRoleFilterBar';
import { useCart } from './context/CartContext';
import { PRODUCTS_CATALOG, QUICK_CATEGORIES, POPULAR_SEARCH_TERMS, SOLUTION_BUNDLES, ProductItem } from './data/products';
import {
  Zap,
  Clock,
  ShieldCheck,
  Truck,
  Layers,
  ChevronRight,
  ChevronLeft,
  Search,
  ShoppingBag,
  Smartphone,
  Pipette,
  Droplets,
  Wrench,
  Paintbrush,
  Shield,
  Hammer,
  Boxes,
  Mic,
  Camera
} from 'lucide-react';

const getCategoryIcon = (iconName: string) => {
  switch (iconName) {
    case 'Pipette':
      return <Pipette className="w-4 h-4 text-sky-600" />;
    case 'Droplets':
      return <Droplets className="w-4 h-4 text-blue-600" />;
    case 'Layers':
      return <Layers className="w-4 h-4 text-amber-600" />;
    case 'Wrench':
      return <Wrench className="w-4 h-4 text-[#ff6b00]" />;
    case 'Zap':
      return <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />;
    case 'Paintbrush':
      return <Paintbrush className="w-4 h-4 text-purple-600" />;
    case 'Shield':
      return <Shield className="w-4 h-4 text-emerald-600" />;
    case 'Hammer':
      return <Hammer className="w-4 h-4 text-slate-700" />;
    default:
      return <Boxes className="w-4 h-4 text-orange-600" />;
  }
};

const BRAND_PARTNERS = [
  { name: 'Ashirvad Pipes', logo: '/brands/ashirvad.svg', searchTerm: 'Ashirvad' },
  { name: 'Pidilite Industries', logo: '/brands/pidilite.svg', searchTerm: 'Pidilite' },
  { name: 'Bosch Power Tools', logo: '/brands/bosch.svg', searchTerm: 'Bosch' },
  { name: 'Supreme Industries', logo: '/brands/supreme.svg', searchTerm: 'Supreme' },
  { name: 'Asian Paints', logo: '/brands/asian-paints.svg', searchTerm: 'Asian Paints' },
  { name: 'Finolex Cables', logo: '/brands/finolex.svg', searchTerm: 'Finolex' },
  { name: 'Tata Tiscon', logo: '/brands/tata-tiscon.svg', searchTerm: 'Tata Tiscon' },
  { name: 'Havells India', logo: '/brands/havells.svg', searchTerm: 'Havells' },
  { name: 'Cera Sanitaryware', logo: '/brands/cera.svg', searchTerm: 'Cera' },
  { name: 'Astral Pipes', logo: '/brands/astral.svg', searchTerm: 'Astral' },
];

export const App: React.FC = () => {
  const { setIsCartOpen, lastAddedItemName, totalCount } = useCart();

  // Search State
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchResponse, setSearchResponse] = useState<SearchApiResponse | null>(null);
  const [isBypassed, setIsBypassed] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Full-page SRP view toggle
  const [isSrpView, setIsSrpView] = useState(false);

  // Trade Profession Role Selection (All, Electrician, Plumber, Painter, Carpenter, Civil Contractor)
  const [selectedTradeRole, setSelectedTradeRole] = useState<TradeRole>('All');

  const handleSelectTradeRole = (role: TradeRole) => {
    setSelectedTradeRole(role);
    setIsSrpView(false);
    if (role === 'All') {
      setSelectedCategory(null);
    } else if (role === 'Electrician') {
      setSelectedCategory('electricals-wiring');
    } else if (role === 'Plumber') {
      setSelectedCategory('plumbing-fittings');
    } else if (role === 'Painter') {
      setSelectedCategory('paints-finishes');
    } else if (role === 'Carpenter') {
      setSelectedCategory('adhesives-sealants');
    } else if (role === 'Civil & General Contractor') {
      setSelectedCategory('steel-aggregates');
    }
  };

  // Modals & Drawers
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isMobileFrameActive, setIsMobileFrameActive] = useState(false);

  // Storage Search Keys
  const STORAGE_RECENT_KEY = 'fixxly_recent_searches';
  const STORAGE_LAST_SEARCHES_KEY = 'fixxly_last_searches';

  // 1. Persistent Storage Search Bar (localStorage)
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_RECENT_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch { }
    return ['pipe', 'tap leaking', 'pidipruf'];
  });

  const updateRecentStorage = (term: string) => {
    const clean = term.trim();
    if (!clean || clean.length < 2) return;
    setRecentSearches((prev) => {
      const filtered = prev.filter((item) => item.toLowerCase() !== clean.toLowerCase());
      const updated = [clean, ...filtered].slice(0, 8);
      try {
        localStorage.setItem(STORAGE_RECENT_KEY, JSON.stringify(updated));
        localStorage.setItem(STORAGE_LAST_SEARCHES_KEY, JSON.stringify(updated.slice(0, 3)));
      } catch { }
      return updated;
    });
  };

  const handleClearRecent = () => {
    setRecentSearches([]);
    try {
      localStorage.removeItem(STORAGE_RECENT_KEY);
      localStorage.removeItem(STORAGE_LAST_SEARCHES_KEY);
    } catch { }
  };

  // 2. Ultra-responsive 50ms debounce for instant background search
  const debouncedQuery = useDebounce(query, 50);

  const searchContainerRef = useRef<HTMLDivElement>(null);
  const aislesScrollRef = useRef<HTMLDivElement>(null);
  const [, setIsAislesAutoRotating] = useState(true);

  // 3. Auto-Rotate for Fast-Delivery Aisles (Smooth periodic scrolling with hover/touch pause)
  useEffect(() => {
    const container = aislesScrollRef.current;
    if (!container) return;

    let isInteracting = false;

    const pause = () => {
      isInteracting = true;
      setIsAislesAutoRotating(false);
    };
    const resume = () => {
      isInteracting = false;
      setIsAislesAutoRotating(true);
    };

    container.addEventListener('mouseenter', pause);
    container.addEventListener('mouseleave', resume);
    container.addEventListener('touchstart', pause, { passive: true });
    container.addEventListener('touchend', resume, { passive: true });

    const interval = setInterval(() => {
      if (isInteracting || !aislesScrollRef.current) return;
      const el = aislesScrollRef.current;
      const maxScroll = el.scrollWidth - el.clientWidth;
      const step = 110;

      if (el.scrollLeft + step >= maxScroll - 15) {
        el.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        el.scrollBy({ left: step, behavior: 'smooth' });
      }
    }, 2600);

    return () => {
      clearInterval(interval);
      container.removeEventListener('mouseenter', pause);
      container.removeEventListener('mouseleave', resume);
      container.removeEventListener('touchstart', pause);
      container.removeEventListener('touchend', resume);
    };
  }, []);

  const scrollAisles = (direction: 'left' | 'right') => {
    if (aislesScrollRef.current) {
      const step = direction === 'left' ? -180 : 180;
      aislesScrollRef.current.scrollBy({ left: step, behavior: 'smooth' });
    }
  };

  // 4. Personalized "Recommended For You" products based on user's last 2-3 searches
  const recommendedProducts = React.useMemo(() => {
    const targetTerms = recentSearches.slice(0, 3);
    if (targetTerms.length === 0) {
      return PRODUCTS_CATALOG.slice(0, 8);
    }

    const seenIds = new Set<string>();
    const results: ProductItem[] = [];

    for (const term of targetTerms) {
      const clean = term.toLowerCase().trim();
      const tokens = clean.split(/\s+/).filter((t) => t.length > 1);

      for (const product of PRODUCTS_CATALOG) {
        if (seenIds.has(product.id)) continue;
        const text = (
          product.name + ' ' +
          product.tags.join(' ') + ' ' +
          product.category + ' ' +
          product.spec + ' ' +
          (product.description || '')
        ).toLowerCase();

        const matches = tokens.some((t) => text.includes(t)) || text.includes(clean);
        if (matches) {
          seenIds.add(product.id);
          results.push(product);
        }
      }
    }

    // Backfill with top fast-moving materials if fewer than 6
    if (results.length < 6) {
      for (const p of PRODUCTS_CATALOG) {
        if (!seenIds.has(p.id)) {
          seenIds.add(p.id);
          results.push(p);
          if (results.length >= 8) break;
        }
      }
    }

    return results.slice(0, 8);
  }, [recentSearches]);

  // 5. Products filtered by selected trade role (strictly matches selected trade)
  const roleFilteredProducts = React.useMemo(() => {
    if (selectedTradeRole === 'All') return PRODUCTS_CATALOG;
    return PRODUCTS_CATALOG.filter(
      (p) => p.tradeRoles && p.tradeRoles.includes(selectedTradeRole)
    );
  }, [selectedTradeRole]);

  // Solution bundles for selected trade role
  const roleSolutionBundles = React.useMemo(() => {
    if (selectedTradeRole === 'Plumber') {
      return [SOLUTION_BUNDLES.BUNDLE_TAP_LEAK, SOLUTION_BUNDLES.BUNDLE_NO_WATER].filter(Boolean);
    }
    if (selectedTradeRole === 'Electrician') {
      return [SOLUTION_BUNDLES.BUNDLE_MCB_TRIP].filter(Boolean);
    }
    if (selectedTradeRole === 'Civil & General Contractor' || selectedTradeRole === 'Painter') {
      return [SOLUTION_BUNDLES.BUNDLE_SEEPAGE_FIX].filter(Boolean);
    }
    return [];
  }, [selectedTradeRole]);

  // Close search dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch search results whenever debounced query or bypass changes (Synchronous Zero-Buffering)
  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setSearchResponse(null);
      setIsLoading(false);
      return;
    }

    const instant = TradeSearchService.executeSearchSync(debouncedQuery, '560078', isBypassed);
    setSearchResponse(instant);
    setIsLoading(false);

    if (debouncedQuery.trim().length > 2) {
      updateRecentStorage(debouncedQuery);
    }
  }, [debouncedQuery, isBypassed]);

  // Handlers with instant zero-buffering search
  const handleQueryChange = (val: string) => {
    setQuery(val);
    setIsBypassed(false);

    if (!val.trim()) {
      setSearchResponse(null);
      setIsLoading(false);
      if (isSrpView) {
        setIsSrpView(false);
      }
      return;
    }

    // ⚡ Instant Synchronous Search (0ms latency) - Never buffer
    const instant = TradeSearchService.executeSearchSync(val, '560078', isBypassed);
    setSearchResponse(instant);
    setIsLoading(false);
  };

  const handleClear = () => {
    setQuery('');
    setSearchResponse(null);
    setSelectedCategory(null);
    setIsBypassed(false);
  };

  const handleToggleCorrection = () => {
    setIsBypassed((prev) => !prev);
  };

  const handleSelectSearchTerm = (term: string) => {
    setQuery(term);
    setIsBypassed(false);
    updateRecentStorage(term);

    // ⚡ Directly execute search synchronously (< 1ms) - ZERO BUFFERING
    const instantResult = TradeSearchService.executeSearchSync(term, '560078', false);
    setSearchResponse(instantResult);
    setIsLoading(false);

    if (isMobileFrameActive) {
      setIsMobileSearchOpen(true);
    } else {
      setIsFocused(false); // Close dropdown immediately so user directly sees the results
      setIsSrpView(true);  // Switch straight to Search Results Page
    }
  };

  const handleViewAllClick = () => {
    setIsFocused(false);
    setIsMobileSearchOpen(false);
    setIsSrpView(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleViewAllClick();
    } else if (e.key === 'Escape') {
      setIsFocused(false);
    }
  };

  const handleToggleMobilePreview = () => {
    setIsMobileFrameActive((prev) => !prev);
    setIsMobileSearchOpen(false);
    setIsFocused(false);
  };

  const handleSearchFocus = () => {
    if (isMobileFrameActive) {
      setIsMobileSearchOpen(true);
    } else {
      setIsFocused(true);
    }
  };

  const triggerMobileSearch = () => {
    setIsMobileSearchOpen(true);
  };

  return (
    <div className={`min-h-screen ${isMobileFrameActive ? 'bg-slate-900 py-6 px-2 flex flex-col items-center justify-start min-h-screen' : 'bg-[#f8f9fa]'}`}>

      {/* Floating Mode Switcher when Mobile Frame is active */}
      {isMobileFrameActive && (
        <div className="mb-4 bg-[#0b1d3a] text-white px-4 py-2 rounded-full shadow-2xl border border-orange-500/40 flex items-center gap-3 animate-fade-in text-xs font-bold shrink-0">
          <span className="flex items-center gap-1.5 text-orange-200">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <Smartphone className="w-3.5 h-3.5 text-[#ff6b00]" />
            Mobile View (390px)
          </span>
          <button
            type="button"
            onClick={() => {
              setIsMobileFrameActive(false);
              setIsMobileSearchOpen(false);
              setIsFocused(false);
            }}
            className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            Switch to Desktop View
          </button>
        </div>
      )}

      {/* Main Container (Transforms into smartphone frame when isMobileFrameActive is true) */}
      <div className={`flex flex-col bg-[#f8f9fa] text-[#111827] transition-all duration-300 w-full ${isMobileFrameActive
        ? 'max-w-[400px] rounded-[40px] border-[10px] border-[#071326] shadow-2xl overflow-hidden min-h-[820px] relative'
        : 'min-h-screen'
        }`}>
        {/* 1. Brand Navbar */}
        <Navbar
          onOpenCart={() => setIsCartOpen(true)}
          isMobilePreview={isMobileFrameActive}
          onToggleMobilePreview={handleToggleMobilePreview}
          onTriggerSearchMobile={triggerMobileSearch}
          currentQuery={query}
        >
          {/* Search Bar & Dropdown Container */}
          <div ref={searchContainerRef} className="relative w-full">
            <SearchBar
              query={query}
              onChange={handleQueryChange}
              onClear={handleClear}
              onFocus={handleSearchFocus}
              isFocused={isFocused}
              onOpenVoice={() => setIsVoiceOpen(true)}
              onOpenPhoto={() => setIsCameraOpen(true)}
              onKeyDown={handleKeyDown}
            />

            {/* Upgraded Search Results Dropdown */}
            <SearchDropdown
              isOpen={isFocused}
              searchResponse={searchResponse}
              isLoading={isLoading}
              query={query}
              isBypassed={isBypassed}
              onToggleCorrection={handleToggleCorrection}
              onSelectSearchTerm={handleSelectSearchTerm}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              onViewAllClick={handleViewAllClick}
              recentSearches={recentSearches}
              onClearRecent={handleClearRecent}
              selectedTradeRole={selectedTradeRole}
              onSelectTradeRole={handleSelectTradeRole}
              recommendedProducts={recommendedProducts}
            />
          </div>
        </Navbar>

        {/* Mobile Full-Page Search Screen inside Smartphone Frame */}
        {isMobileFrameActive && (
          <MobileSearchPage
            isOpen={isMobileSearchOpen}
            onClose={() => setIsMobileSearchOpen(false)}
            query={query}
            onQueryChange={handleQueryChange}
            onClear={handleClear}
            searchResponse={searchResponse}
            isLoading={isLoading}
            isBypassed={isBypassed}
            onToggleCorrection={handleToggleCorrection}
            onSelectSearchTerm={(term) => {
              handleSelectSearchTerm(term);
              setIsMobileSearchOpen(true);
            }}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            onOpenVoice={() => setIsVoiceOpen(true)}
            onOpenPhoto={() => setIsCameraOpen(true)}
            recentSearches={recentSearches}
            onClearRecent={handleClearRecent}
            isInsideFrame={true}
            selectedTradeRole={selectedTradeRole}
            onSelectTradeRole={handleSelectTradeRole}
          />
        )}

        {/* Item Added Toast Notification */}
        {lastAddedItemName && (
          <div className="fixed bottom-6 right-6 z-50 bg-[#0b1d3a] text-white px-4 py-3 rounded-xl shadow-2xl border border-orange-500/30 flex items-center gap-3 animate-slide-down">
            <div className="w-8 h-8 rounded-lg bg-[#ff6b00] flex items-center justify-center text-white shrink-0 font-bold">
              <Zap className="w-4 h-4 fill-current" />
            </div>
            <div>
              <div className="text-xs font-bold text-white line-clamp-1">
                Added to Fixxly Cart
              </div>
              <div className="text-[11px] text-orange-200 line-clamp-1">
                {lastAddedItemName}
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="ml-2 px-2.5 py-1 rounded bg-[#ff6b00] hover:bg-orange-600 text-white text-xs font-bold transition-colors cursor-pointer"
            >
              View Cart
            </button>
          </div>
        )}

        {/* 2. Popular Searches Bar */}
        <section className="bg-white border-b border-[#e5e7eb] px-3 py-2 shadow-2xs">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            <span className="shrink-0 text-xs font-bold text-gray-500 uppercase tracking-wider">
              Trending:
            </span>

            {POPULAR_SEARCH_TERMS.slice(0, 8).map((item) => (
              <button
                key={item.term}
                type="button"
                onClick={() => handleSelectSearchTerm(item.properName)}
                className="shrink-0 px-3 py-1.5 rounded-lg bg-gray-50 hover:bg-orange-50 text-gray-800 hover:text-[#ff6b00] border border-gray-200 hover:border-orange-200 text-xs font-bold transition-all cursor-pointer shadow-2xs"
                title={`Search ${item.properName}`}
              >
                {item.properName}
              </button>
            ))}
          </div>
        </section>

        {/* 2.5 Trade Profession Filter Bar (Expanded Full Width Edge-to-Edge) */}
        <section className="bg-white border-b border-gray-200 shadow-2xs w-full">
          <div className="w-full">
            <TradeRoleFilterBar
              activeRole={selectedTradeRole}
              onSelectRole={handleSelectTradeRole}
            />
          </div>
        </section>

        {/* 3. Main Content Body */}
        <main className="flex-1 max-w-7xl xl:max-w-[1440px] 2xl:max-w-[1600px] w-full mx-auto px-4 sm:px-8 py-8">

          {/* Full-Page Search Results Page (SRP) View when toggled */}
          {isSrpView && searchResponse ? (
            <div className="space-y-6 animate-fade-in">
              {/* SRP Header Breadcrumb */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-200">
                <div>
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                    <button
                      type="button"
                      onClick={() => setIsSrpView(false)}
                      className="hover:text-[#ff6b00] transition-colors cursor-pointer"
                    >
                      Home
                    </button>
                    <ChevronRight className="w-3 h-3" />
                    <span>Search</span>
                    <ChevronRight className="w-3 h-3" />
                    <span className="font-semibold text-[#0b1d3a]">"{query}"</span>
                  </div>
                  <h1 className="text-xl sm:text-2xl font-extrabold text-[#0b1d3a]">
                    Search Results for "{query}"
                  </h1>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Showing {searchResponse.total_results} trade verified SKUs available for 30-min delivery
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsSrpView(false)}
                  className="self-start sm:self-auto px-4 py-2 rounded-xl bg-white hover:bg-gray-100 border border-gray-200 text-xs font-bold text-gray-700 transition-colors shadow-2xs cursor-pointer flex items-center gap-1.5"
                >
                  ← Back to Storefront
                </button>
              </div>

              {/* ========================================================= */}
              {/* DIRECT INSTANT RESULTS (Visible Above the Fold)          */}
              {/* ========================================================= */}
              <div className="space-y-4">
                {/* Did-You-Mean on SRP */}
                {searchResponse.did_you_mean_triggered && searchResponse.display_corrected_term && (
                  <AutoCorrectionBanner
                    originalQuery={query}
                    resolvedTerm={searchResponse.display_corrected_term}
                    isBypassed={isBypassed}
                    onToggleCorrection={handleToggleCorrection}
                    executionTimeMs={searchResponse.execution_time_ms}
                  />
                )}

                {/* Pinned Solution Bundle on SRP */}
                {searchResponse.solution_bundle && (
                  <div>
                    <h2 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                      Recommended Problem-Solving Bundle
                    </h2>
                    <SolutionBundleCard bundle={searchResponse.solution_bundle} />
                  </div>
                )}

                {/* Matching Product Grid */}
                <div className="bg-white p-4 sm:p-6 rounded-2xl border border-gray-200 shadow-2xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-gray-100">
                    <span className="text-sm sm:text-base font-bold text-[#0b1d3a]">
                      Matching Trade Products ({(selectedCategory ? searchResponse.items.filter((i) => i.categoryId === selectedCategory) : searchResponse.items).length} SKUs)
                    </span>
                    {searchResponse.suggested_categories.length > 1 && (
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500 font-medium hidden sm:inline">Category Filter:</span>
                        <select
                          value={selectedCategory || ''}
                          onChange={(e) => setSelectedCategory(e.target.value || null)}
                          className="text-xs font-semibold bg-white border border-gray-300 rounded-lg px-3 py-1.5 outline-none shrink-0 cursor-pointer focus:border-[#ff6b00]"
                        >
                          <option value="">All Categories ({searchResponse.total_results})</option>
                          {searchResponse.suggested_categories.map((c) => (
                            <option key={c.id} value={c.id}>
                              {c.name} ({c.count})
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>

                  {(selectedCategory ? searchResponse.items.filter((i) => i.categoryId === selectedCategory) : searchResponse.items).length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-5">
                      {(selectedCategory
                        ? searchResponse.items.filter((i) => i.categoryId === selectedCategory)
                        : searchResponse.items
                      ).map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>
                  ) : (
                    <div className="py-8 text-center text-gray-500">
                      <p className="text-sm font-semibold text-gray-700">No products in this specific category filter.</p>
                      <button
                        type="button"
                        onClick={() => setSelectedCategory(null)}
                        className="mt-2 text-xs font-bold text-[#ff6b00] hover:underline cursor-pointer"
                      >
                        Show all {searchResponse.items.length} matching products
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* ========================================================= */}
              {/* SECONDARY DISCOVERY (Below Results): Recent & Popular     */}
              {/* ========================================================= */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {recentSearches.length > 0 && (
                  <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-2xs">
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Recent Searches
                      </span>
                      <button
                        type="button"
                        onClick={handleClearRecent}
                        className="text-xs text-gray-400 hover:text-red-500 font-medium transition-colors cursor-pointer"
                      >
                        Clear All
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {recentSearches.map((term) => (
                        <button
                          key={term}
                          type="button"
                          onClick={() => handleSelectSearchTerm(term)}
                          className="px-2.5 py-1 rounded-lg bg-gray-50 hover:bg-orange-50 border border-gray-200 hover:border-orange-200 text-xs font-medium text-gray-700 hover:text-[#ff6b00] transition-colors cursor-pointer shadow-2xs"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                  <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-2xs">
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Popular Contractor Searches
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {POPULAR_SEARCH_TERMS.slice(0, 8).map((item) => (
                        <button
                          key={item.term}
                          type="button"
                          onClick={() => handleSelectSearchTerm(item.properName)}
                          className="px-3 py-1.5 rounded-lg bg-gray-50 hover:bg-orange-50 border border-gray-200 hover:border-orange-200 text-xs font-bold text-gray-800 hover:text-[#ff6b00] transition-colors cursor-pointer shadow-2xs"
                          title={`Search ${item.properName}`}
                        >
                          {item.properName}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              ) : selectedTradeRole !== 'All' ? (
              /* ======================================================== */
              /* DEDICATED TRADE-FILTERED VIEW (e.g. Plumber, Electrician) */
              /* Shows ONLY products related to that filter               */
              /* ======================================================== */
              <div className="space-y-6 sm:space-y-8 animate-fade-in">
                {/* 1. Dedicated Trade Header Card */}
                <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-gray-200 shadow-2xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-gray-500 mb-1.5 font-medium">
                        <button
                          type="button"
                          onClick={() => handleSelectTradeRole('All')}
                          className="hover:text-[#ff6b00] hover:underline cursor-pointer"
                        >
                          Storefront
                        </button>
                        <ChevronRight className="w-3 h-3 text-gray-400" />
                        <span>Trade Supplies</span>
                        <ChevronRight className="w-3 h-3 text-gray-400" />
                        <span className="font-bold text-[#ff6b00]">{selectedTradeRole}</span>
                      </div>

                      <div className="flex flex-wrap items-center gap-3">
                        <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#0b1d3a] tracking-tight">
                          {selectedTradeRole} Materials &amp; Supplies
                        </h1>
                        <span className="px-3 py-1 rounded-full bg-orange-100 text-[#ff6b00] font-bold text-xs border border-orange-200">
                          {roleFilteredProducts.length} SKUs Verified
                        </span>
                      </div>

                      <p className="text-xs sm:text-sm text-gray-500 mt-1 max-w-2xl">
                        Showing exclusively genuine materials and tools curated for professional {selectedTradeRole.toLowerCase()} job sites. Direct factory-sealed stock with 30-min express site dispatch.
                      </p>
                    </div>

                    {/* Clear Filter button */}
                    <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                      <button
                        type="button"
                        onClick={() => handleSelectTradeRole('All')}
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gray-100 hover:bg-orange-50 text-gray-700 hover:text-[#ff6b00] text-xs font-bold transition-all cursor-pointer border border-gray-200 hover:border-orange-200 shadow-2xs"
                      >
                        <span>✕ Clear Filter</span>
                        <span className="text-gray-400 font-normal hidden sm:inline">(Show All)</span>
                      </button>
                    </div>
                  </div>

              {/* Quick site assurances for this trade */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-4 mt-4 border-t border-gray-100 text-xs text-gray-600 font-medium">
                <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>100% Genuine {selectedTradeRole} Supplies</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-[#ff6b00]" />
                  <span>28-30 Mins JP Nagar Hub Dispatch</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span>Contractor GST Invoice Included</span>
                </div>
              </div>
            </div>

              {/* 2. Recommended Problem-Solving Kits for this Trade */}
          {roleSolutionBundles.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-sm sm:text-base font-bold text-[#0b1d3a] flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-orange-100 text-[#ff6b00] flex items-center justify-center text-xs font-black">
                    ★
                  </span>
                  Recommended {selectedTradeRole} Problem-Solving Kits
                </h2>
                <span className="text-xs font-semibold text-[#ff6b00] bg-orange-50 px-2.5 py-1 rounded-full border border-orange-200">
                  Up to 43% OFF Bundles
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {roleSolutionBundles.map((bundle) => (
                  <SolutionBundleCard key={bundle.id} bundle={bundle} />
                ))}
              </div>
            </div>
          )}

          {/* 3. Product Catalog Grid - ONLY products related to this trade */}
          <div className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-gray-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-[#0b1d3a]">
                  All {selectedTradeRole} Products ({roleFilteredProducts.length})
                </h2>
                <p className="text-xs text-gray-500">
                  Dispatched from JP Nagar Hub in 28 mins
                </p>
              </div>
              <span className="text-xs font-bold text-green-700 bg-green-50 px-3 py-1 rounded-full border border-green-200">
                In Stock &amp; Ready
              </span>
            </div>

            {/* Grid with ALL matching products */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-5">
              {roleFilteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>

          {/* 4. Brand Partners Marquee */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-2xs space-y-4 overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-[#0b1d3a]">
                  Authorized Manufacturer Brand Partners
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  100% Genuine factory-sealed warranty across India's leading building material brands
                </p>
              </div>
              <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2.5 py-1 rounded-lg border border-orange-200">
                Zero Counterfeit Policy
              </span>
            </div>

            <div className="relative w-full overflow-hidden pt-3 pb-2">
              <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-14 sm:w-24 bg-gradient-to-r from-white via-white/90 to-transparent z-10" />
              <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-14 sm:w-24 bg-gradient-to-l from-white via-white/90 to-transparent z-10" />

              <div className="animate-marquee flex items-center gap-10 sm:gap-14 md:gap-16 py-2 cursor-grab active:cursor-grabbing">
                {[...BRAND_PARTNERS, ...BRAND_PARTNERS].map((brand, idx) => (
                  <button
                    key={`${brand.name}-${idx}`}
                    type="button"
                    onClick={() => handleSelectSearchTerm(brand.searchTerm)}
                    title={`Search ${brand.name} products`}
                    className="group flex items-center justify-center p-2 shrink-0 cursor-pointer transition-transform duration-300 focus:outline-hidden"
                  >
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className="h-8 sm:h-10 md:h-11 w-auto max-w-[160px] sm:max-w-[200px] object-contain opacity-85 hover:opacity-100 transition-all duration-300 transform group-hover:scale-110"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 5. Trust & Trade Guarantee Cards */}
          <div className={`grid ${isMobileFrameActive ? 'grid-cols-1 gap-2' : 'grid-cols-1 md:grid-cols-3 gap-5'}`}>
            <div className="bg-white p-5 rounded-2xl border border-gray-200 flex items-start gap-4 shadow-xs">
              <div className="p-3 rounded-xl bg-green-50 text-green-700 shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900">
                  100% Genuine Direct from Brand
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Authorized distributor warranty on Ashirvad, Pidilite, Bosch &amp; Finolex.
                </p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-200 flex items-start gap-4 shadow-xs">
              <div className="p-3 rounded-xl bg-orange-50 text-[#ff6b00] shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900">
                  30-Minute Job Site Express
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Orders packed within 3 minutes and delivered straight to the site.
                </p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-200 flex items-start gap-4 shadow-xs">
              <div className="p-3 rounded-xl bg-blue-50 text-[#0b1d3a] shrink-0">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900">
                  Contractor GST Ready Invoicing
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Seamless input tax credit for construction contractors.
                </p>
              </div>
            </div>
          </div>
      </div>
      ) : (
      /* Normal Storefront Hero & Trade Aisles */
      <div className="space-y-8 sm:space-y-10">
        {/* Clean Trade Text Banner (No products / No clutter) */}
        <div
          className={`rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#0b1d3a] via-[#0f2347] to-[#0b1d3a] text-white shadow-xl relative overflow-hidden border border-white/10 ${isMobileFrameActive ? 'p-5 sm:p-6' : 'p-8 sm:p-10'
            }`}
        >
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 text-[#ff6b00] border border-orange-500/30 text-xs font-bold">
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>30-Minute Trade Express Delivery Across Bengaluru</span>
            </div>

            <h1
              className={`${isMobileFrameActive ? 'text-2xl' : 'text-3xl sm:text-4xl lg:text-5xl'
                } font-black tracking-tight leading-tight text-white`}
            >
              Site Materials Delivered in{' '}
              <span className="text-[#ff6b00]">30 Minutes.</span>
            </h1>

            <p className="text-xs sm:text-base text-gray-300 leading-relaxed max-w-2xl">
              Don't let site work stop. Genuine CPVC pipes, cables, adhesives &amp; power tools dispatched directly from your nearest local hub to your job site.
            </p>

            {/* Clean Voice & Scan Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => setIsVoiceOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-[#ff6b00] hover:bg-[#e55f00] text-white font-bold text-xs sm:text-sm transition-all shadow-md flex items-center gap-2 cursor-pointer group"
              >
                <Mic className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
                <span>Voice Order</span>
              </button>

              <button
                type="button"
                onClick={() => setIsCameraOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/20 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Camera className="w-4 h-4 text-orange-400" />
                <span>Scan Material List</span>
              </button>
            </div>

            {/* 3 Real Contractor Guarantees (Clean, simple, no clutter) */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-3 text-xs text-gray-300 font-medium border-t border-white/10">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#ff6b00]" />
                <span>30-Min Fast Site Dispatch</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-green-400" />
                <span>100% Brand Sealed Stock</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-400" />
                <span>Instant Contractor GST Invoices</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Trade Aisles Bar */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base sm:text-lg font-bold text-[#0b1d3a]">
              Explore 30-Min Fast-Delivery Aisles
            </h2>

            {/* Left/Right manual arrow buttons only when in mobile preview */}
            {isMobileFrameActive && (
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => scrollAisles('left')}
                  className="p-1.5 rounded-lg bg-white border border-gray-200 hover:border-[#ff6b00] hover:text-[#ff6b00] text-gray-600 transition-colors shadow-2xs cursor-pointer"
                  title="Slide left"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollAisles('right')}
                  className="p-1.5 rounded-lg bg-white border border-gray-200 hover:border-[#ff6b00] hover:text-[#ff6b00] text-gray-600 transition-colors shadow-2xs cursor-pointer"
                  title="Slide right"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* On Desktop: Full 8-Column Responsive Grid | On Mobile: Auto-Rotating Track */}
          {isMobileFrameActive ? (
            <div
              ref={aislesScrollRef}
              className="flex items-stretch gap-2.5 overflow-x-auto no-scrollbar scroll-smooth snap-x py-1 px-0.5"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {QUICK_CATEGORIES.slice(1).map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    handleSelectSearchTerm(cat.name);
                  }}
                  className="w-[105px] shrink-0 snap-start p-2.5 rounded-xl bg-white border border-[#e5e7eb] hover:border-[#ff6b00] hover:shadow-cardHover transition-all text-center flex flex-col items-center justify-between gap-1.5 cursor-pointer group shadow-2xs"
                >
                  <div className="w-9 h-9 rounded-lg bg-gray-50 group-hover:bg-orange-50 flex items-center justify-center transition-colors shrink-0">
                    {getCategoryIcon(cat.icon)}
                  </div>
                  <span className="text-[11px] font-bold text-gray-800 text-center leading-tight group-hover:text-[#ff6b00] w-full px-0.5 whitespace-normal break-words">
                    {cat.shortName || cat.name}
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-4 md:grid-cols-8 gap-3 sm:gap-4">
              {QUICK_CATEGORIES.slice(1).map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    handleSelectSearchTerm(cat.name);
                  }}
                  className="p-3 sm:p-4 rounded-2xl bg-white border border-[#e5e7eb] hover:border-[#ff6b00] hover:shadow-cardHover transition-all text-center flex flex-col items-center justify-between gap-2 cursor-pointer group shadow-2xs"
                >
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gray-50 group-hover:bg-orange-50 flex items-center justify-center transition-colors shrink-0">
                    {getCategoryIcon(cat.icon)}
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-gray-800 text-center leading-tight group-hover:text-[#ff6b00] w-full whitespace-normal break-words">
                    {cat.shortName || cat.name}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Fast-Moving Materials in JP Nagar - Full Commercial Grid on Desktop */}
        <div>
          <div className="flex items-center justify-between gap-2 mb-3">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-[#0b1d3a] leading-snug">
                Fast-Moving Materials in JP Nagar {selectedTradeRole !== 'All' ? `• ${selectedTradeRole} Essentials` : ''}
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                {selectedTradeRole !== 'All'
                  ? `Filtered for ${selectedTradeRole} site requirements`
                  : 'Plumbing, waterproofing, adhesives & electricals in stock'}
              </p>
            </div>
            <span className="text-xs font-semibold text-green-700 bg-green-50 px-3 py-1 rounded-full border border-green-200 shrink-0">
              28 Mins Express
            </span>
          </div>

          {/* On Desktop: Full 10-Item 2-Row Grid | On Mobile: Horizontal Carousel */}
          {isMobileFrameActive ? (
            <div
              className="flex items-stretch gap-2.5 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory pb-3 pt-1 px-0.5"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {roleFilteredProducts.slice(0, 8).map((product) => (
                <div
                  key={product.id}
                  className="w-[calc(50%-5px)] shrink-0 snap-start flex flex-col"
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5">
              {roleFilteredProducts.slice(0, 10).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>

        {/* Contractor Direct Site Delivery & Bulk Supply Card (Eliminates empty white space on desktop) */}
        {!isMobileFrameActive && (
          <div className="rounded-3xl bg-gradient-to-r from-[#0b1d3a] via-[#102445] to-[#0b1d3a] p-8 text-white shadow-xl border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/20 text-[#ff6b00] border border-orange-500/30 text-xs font-bold">
                <Truck className="w-3.5 h-3.5" />
                Contractor Bulk Supply Logistics
              </div>
              <h3 className="text-2xl font-black tracking-tight text-white">
                Need Full Truckload Steel, Cement, or Pipe Bundles?
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                Direct warehouse dispatch across Bengaluru. Enjoy volume trade discounting, scheduled daily site drop-offs, and verified manufacturer test certificates.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => handleSelectSearchTerm('sariya')}
                className="px-5 py-3 rounded-xl bg-[#ff6b00] hover:bg-orange-600 text-white font-extrabold text-sm transition-all shadow-md cursor-pointer"
              >
                Explore Bulk TMT &amp; Pipes
              </button>
              <a
                href="tel:1800123456"
                className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all cursor-pointer"
              >
                Call Hub Desk
              </a>
            </div>
          </div>
        )}

        {/* Authorized Manufacturer Brand Partners Continuous Rotating Marquee */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-2xs space-y-4 overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-[#0b1d3a]">
                Authorized Manufacturer Brand Partners
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                100% Genuine factory-sealed warranty across India's leading building material brands
              </p>
            </div>
            <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2.5 py-1 rounded-lg border border-orange-200">
              Zero Counterfeit Policy
            </span>
          </div>

          {/* Continuous Rotating Infinite Marquee without boxes */}
          <div className="relative w-full overflow-hidden pt-3 pb-2">
            {/* Edge fade masks for smooth transition */}
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-14 sm:w-24 bg-gradient-to-r from-white via-white/90 to-transparent z-10" />
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-14 sm:w-24 bg-gradient-to-l from-white via-white/90 to-transparent z-10" />

            {/* Rotating track (seamless floating logos) */}
            <div className="animate-marquee flex items-center gap-10 sm:gap-14 md:gap-16 py-2 cursor-grab active:cursor-grabbing">
              {[...BRAND_PARTNERS, ...BRAND_PARTNERS].map((brand, idx) => (
                <button
                  key={`${brand.name}-${idx}`}
                  type="button"
                  onClick={() => handleSelectSearchTerm(brand.searchTerm)}
                  title={`Search ${brand.name} products`}
                  className="group flex items-center justify-center p-2 shrink-0 cursor-pointer transition-transform duration-300 focus:outline-hidden"
                >
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="h-8 sm:h-10 md:h-11 w-auto max-w-[160px] sm:max-w-[200px] object-contain opacity-85 hover:opacity-100 transition-all duration-300 transform group-hover:scale-110"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Trust & Trade Guarantee Cards */}
        <div className={`grid ${isMobileFrameActive ? 'grid-cols-1 gap-2' : 'grid-cols-1 md:grid-cols-3 gap-5'}`}>
          <div className="bg-white p-5 rounded-2xl border border-gray-200 flex items-start gap-4 shadow-xs">
            <div className="p-3 rounded-xl bg-green-50 text-green-700 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900">
                100% Genuine Direct from Brand
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Authorized distributor warranty on Ashirvad, Pidilite, Bosch &amp; Finolex.
              </p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200 flex items-start gap-4 shadow-xs">
            <div className="p-3 rounded-xl bg-orange-50 text-[#ff6b00] shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900">
                30-Minute Express Dispatch
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Orders packed within 3 minutes and delivered straight to the site.
              </p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200 flex items-start gap-4 shadow-xs">
            <div className="p-3 rounded-xl bg-blue-50 text-[#0b1d3a] shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900">
                Contractor GST Ready Invoicing
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Seamless input tax credit for construction contractors.
              </p>
            </div>
          </div>
        </div>
      </div>
          )}
    </main>

        {/* 4. Footer */ }
  <footer className="mt-12 bg-[#071326] text-white border-t border-white/10 py-8 px-4 sm:px-8 text-xs">
    <div className="max-w-7xl xl:max-w-[1440px] 2xl:max-w-[1600px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
      <div className="flex items-center gap-2 justify-center">
        <div className="w-5 h-5 rounded-md bg-[#ff6b00] flex items-center justify-center text-white font-bold text-xs">
          <Zap className="w-3.5 h-3.5 fill-current" />
        </div>
        <span className="font-bold text-xs tracking-tight">Fixxly India</span>
        <span className="text-gray-400 text-[10px]">
          • 30-Min Trade Quick Commerce
        </span>
      </div>
      <div className="text-gray-400 text-[10px]">
        <span>Engineered per PRD Day 50 Specs • Bengaluru Hubs Active</span>
      </div>
    </div>
  </footer>

  {/* Mobile Bottom Navigation Bar when in Mobile View */ }
  {
    isMobileFrameActive && (
      <div className="sticky bottom-0 inset-x-0 z-30 bg-[#0b1d3a] text-white border-t border-white/10 px-4 py-2 flex items-center justify-around shadow-sheet mt-auto shrink-0">
        <button
          type="button"
          onClick={() => setIsSrpView(false)}
          className="flex flex-col items-center gap-0.5 text-xs text-orange-200 hover:text-white cursor-pointer"
        >
          <Zap className="w-4 h-4 fill-current text-[#ff6b00]" />
          <span className="text-[10px] font-bold">Home</span>
        </button>

        <button
          type="button"
          onClick={() => setIsMobileSearchOpen(true)}
          className="flex flex-col items-center gap-0.5 text-xs text-white/80 hover:text-white cursor-pointer"
        >
          <div className="p-1 rounded-full bg-[#ff6b00] text-white -mt-3 shadow-md">
            <Search className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-bold">Search</span>
        </button>

        <button
          type="button"
          onClick={() => setIsCartOpen(true)}
          className="flex flex-col items-center gap-0.5 text-xs text-white/80 hover:text-white relative cursor-pointer"
        >
          <ShoppingBag className="w-4 h-4" />
          <span className="text-[10px] font-bold">Cart</span>
          {totalCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#ff6b00] text-white text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">
              {totalCount}
            </span>
          )}
        </button>
      </div>
    )
  }

  {/* Bottom Phone Indicator when isMobileFrameActive */ }
  {
    isMobileFrameActive && (
      <div className="py-2 bg-[#0b1d3a] flex justify-center shrink-0">
        <div className="w-28 h-1 bg-white/40 rounded-full" />
      </div>
    )
  }
      </div >

  {/* 5. Mobile Search Page for actual mobile viewport (when simulator not active) */ }
{
  !isMobileFrameActive && (
    <MobileSearchPage
      isOpen={isMobileSearchOpen}
      onClose={() => setIsMobileSearchOpen(false)}
      query={query}
      onQueryChange={handleQueryChange}
      onClear={handleClear}
      searchResponse={searchResponse}
      isLoading={isLoading}
      isBypassed={isBypassed}
      onToggleCorrection={handleToggleCorrection}
      onSelectSearchTerm={(term) => {
        handleSelectSearchTerm(term);
        setIsMobileSearchOpen(true);
      }}
      selectedCategory={selectedCategory}
      onSelectCategory={setSelectedCategory}
      onOpenVoice={() => setIsVoiceOpen(true)}
      onOpenPhoto={() => setIsCameraOpen(true)}
      recentSearches={recentSearches}
      onClearRecent={handleClearRecent}
      isInsideFrame={false}
    />
  )
}

{/* 6. Voice Search Simulation Modal */ }
<VoiceSearchModal
  isOpen={isVoiceOpen}
  onClose={() => setIsVoiceOpen(false)}
  onVoiceInputSelect={(voiceText) => {
    setQuery(voiceText);
    setIsFocused(true);
  }}
/>

{/* 7. Camera / Hardware Scanner Modal */ }
<CameraSearchModal
  isOpen={isCameraOpen}
  onClose={() => setIsCameraOpen(false)}
  onPhotoSelected={(photoQuery) => {
    setQuery(photoQuery);
    setIsFocused(true);
  }}
/>

{/* 8. Slide-out Cart Drawer */ }
<CartDrawer />
    </div >
  );
};

export default App;
