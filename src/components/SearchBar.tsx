import React, { useRef } from 'react';
import { Search, X, Mic, Camera } from 'lucide-react';

interface SearchBarProps {
  query: string;
  onChange: (val: string) => void;
  onClear: () => void;
  onFocus: () => void;
  isFocused: boolean;
  onOpenVoice: () => void;
  onOpenPhoto: () => void;
  placeholder?: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  query,
  onChange,
  onClear,
  onFocus,
  isFocused,
  onOpenVoice,
  onOpenPhoto,
  placeholder = 'Search "pipe ka ring", "pidipruf", "tap leaking"...',
  onKeyDown
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="relative w-full">
      <div
        className={`relative flex items-center w-full bg-white rounded-xl transition-all duration-200 border ${
          isFocused
            ? 'border-[#ff6b00] ring-3 ring-orange-500/15 shadow-md'
            : 'border-[#e5e7eb] hover:border-gray-300 shadow-sm'
        }`}
      >
        {/* Left Search Icon */}
        <div className="pl-3.5 pr-2 flex items-center pointer-events-none text-gray-400">
          <Search className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors ${isFocused ? 'text-[#ff6b00]' : 'text-gray-400'}`} />
        </div>

        {/* Input Element */}
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          className="w-full py-2.5 sm:py-3 text-xs sm:text-sm font-medium text-[#111827] placeholder:text-[#6b7280] bg-transparent outline-none truncate"
        />

        {/* Right Action Icons */}
        <div className="flex items-center gap-1 sm:gap-1.5 pr-2.5 shrink-0">
          {/* Clear Button */}
          {query && (
            <button
              type="button"
              onClick={() => {
                onClear();
                inputRef.current?.focus();
              }}
              className="p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
              title="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          {/* Voice Search Placeholder */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenVoice();
            }}
            className="p-1.5 rounded-lg text-gray-500 hover:text-[#ff6b00] hover:bg-orange-50 transition-colors cursor-pointer"
            title="Voice Search (Contractor Slang Support)"
          >
            <Mic className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
          </button>

          {/* Camera Search Placeholder */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenPhoto();
            }}
            className="p-1.5 rounded-lg text-gray-500 hover:text-[#ff6b00] hover:bg-orange-50 transition-colors cursor-pointer"
            title="Photo / Hardware Scanner"
          >
            <Camera className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
