import React from 'react';

export const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-3 flex flex-col justify-between shadow-sm animate-pulse h-full">
      <div className="relative w-full aspect-square bg-gray-100 rounded-lg overflow-hidden mb-2.5">
        <div className="absolute top-2 left-2 w-16 h-4 bg-gray-200 rounded-full" />
      </div>

      <div className="space-y-2">
        {/* Brand */}
        <div className="w-16 h-3 bg-gray-200 rounded" />
        {/* Title */}
        <div className="w-full h-4 bg-gray-200 rounded" />
        <div className="w-3/4 h-4 bg-gray-200 rounded" />
        {/* Spec Pill */}
        <div className="w-24 h-5 bg-gray-200 rounded-full mt-1.5" />
      </div>

      <div className="mt-3 pt-2.5 border-t border-gray-100 flex items-center justify-between">
        <div className="space-y-1">
          <div className="w-16 h-5 bg-gray-200 rounded" />
          <div className="w-12 h-3 bg-gray-200 rounded" />
        </div>
        <div className="w-20 h-8 bg-gray-200 rounded-lg" />
      </div>
    </div>
  );
};

export const SolutionBundleSkeleton: React.FC = () => {
  return (
    <div className="bg-orange-50/50 border border-orange-200 rounded-xl p-3.5 animate-pulse mb-3.5">
      <div className="flex items-center justify-between mb-2.5">
        <div className="w-48 h-4 bg-orange-200/60 rounded" />
        <div className="w-24 h-5 bg-orange-200/60 rounded-full" />
      </div>
      <div className="flex gap-2 mb-3">
        <div className="w-14 h-14 bg-orange-100 rounded-lg" />
        <div className="w-14 h-14 bg-orange-100 rounded-lg" />
        <div className="w-14 h-14 bg-orange-100 rounded-lg" />
      </div>
      <div className="flex items-center justify-between pt-2 border-t border-orange-200/60">
        <div className="w-28 h-5 bg-orange-200/60 rounded" />
        <div className="w-28 h-8 bg-orange-300/60 rounded-lg" />
      </div>
    </div>
  );
};

export const SearchDropdownSkeleton: React.FC = () => {
  return (
    <div className="p-4 space-y-4">
      <div className="w-full h-8 bg-gray-100 rounded-lg animate-pulse" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <ProductCardSkeleton />
        <ProductCardSkeleton />
        <ProductCardSkeleton />
        <ProductCardSkeleton />
      </div>
    </div>
  );
};
