import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface QuickFilterProps {
  categories: { id: string; name: string; count: number }[];
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string | null) => void;
  query: string;
  totalResults: number;
  onViewAllClick: () => void;
}

export const CategoryQuickFilters: React.FC<QuickFilterProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  query,
  totalResults,
  onViewAllClick
}) => {
  return (
    <div className="bg-white border-t border-gray-100 rounded-b-2xl overflow-hidden">
      {/* Category Pivot Chips */}
      {categories.length > 0 && (
        <div className="px-3.5 py-2.5 bg-gray-50/70 border-b border-gray-100">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#ff6b00]" />
              Filter by Trade Category
            </span>
            {selectedCategory && (
              <button
                type="button"
                onClick={() => onSelectCategory(null)}
                className="text-[11px] text-[#ff6b00] font-semibold hover:underline cursor-pointer"
              >
                Clear Filter
              </button>
            )}
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
            <button
              type="button"
              onClick={() => onSelectCategory(null)}
              className={`shrink-0 text-xs px-2.5 py-1 rounded-full font-medium transition-all cursor-pointer ${
                selectedCategory === null
                  ? "bg-[#0b1d3a] text-white shadow-2xs"
                  : "bg-white text-gray-700 border border-gray-200 hover:border-gray-300"
              }`}
            >
              All Categories ({totalResults})
            </button>

            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => onSelectCategory(isSelected ? null : cat.id)}
                  className={`shrink-0 text-xs px-2.5 py-1 rounded-full font-medium transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[#0b1d3a] text-white shadow-2xs"
                      : "bg-white text-gray-700 border border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {cat.name} ({cat.count})
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Fixed Bottom Footer CTA */}
      <div className="p-3 bg-white">
        <button
          type="button"
          onClick={onViewAllClick}
          className="w-full py-2.5 px-4 rounded-xl bg-[#0b1d3a] hover:bg-[#132c54] active:scale-[0.99] text-white text-xs sm:text-sm font-bold flex items-center justify-between shadow-sm transition-all duration-150 cursor-pointer group"
        >
          <div className="flex items-center gap-2">
            <span>View All Results for</span>
            <span className="text-[#ff6b00] font-extrabold max-w-[140px] sm:max-w-[200px] truncate">
              "{query}"
            </span>
            <span className="text-gray-300 font-normal">
              ({totalResults} items)
            </span>
          </div>

          <div className="flex items-center gap-1 text-xs text-orange-200 group-hover:text-white group-hover:translate-x-1 transition-all">
            <span>Explore SRP</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </button>
      </div>
    </div>
  );
};
