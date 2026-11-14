import React from 'react';
import { Sparkles, ArrowRight, CornerDownRight } from 'lucide-react';

interface AutoCorrectionBannerProps {
  originalQuery: string;
  resolvedTerm: string;
  isBypassed: boolean;
  onToggleCorrection: () => void;
  executionTimeMs?: number;
}

export const AutoCorrectionBanner: React.FC<AutoCorrectionBannerProps> = ({
  originalQuery,
  resolvedTerm,
  isBypassed,
  onToggleCorrection
}) => {
  return (
    <div className="mx-3 my-2.5 p-3 rounded-xl bg-orange-50/70 border border-orange-200/90 text-xs text-gray-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 shadow-2xs">
      {!isBypassed ? (
        <>
          <div className="flex items-start sm:items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-[#ff6b00] text-white flex items-center justify-center shrink-0 mt-0.5 sm:mt-0 shadow-xs">
              <Sparkles className="w-3 h-3 fill-current" />
            </span>
            <div className="leading-snug">
              <span className="text-gray-700 font-medium">
                Did you mean this: <strong className="font-extrabold text-[#0b1d3a]">"{resolvedTerm}"</strong>?
              </span>
              <span className="text-[11px] text-gray-500 block sm:inline sm:ml-2">
                (Showing 30-min express verified materials)
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onToggleCorrection}
            className="self-end sm:self-auto text-[11px] font-medium text-gray-500 hover:text-gray-800 underline transition-colors cursor-pointer shrink-0"
          >
            Search "{originalQuery}" anyway
          </button>
        </>
      ) : (
        <>
          <div className="flex items-center gap-2">
            <CornerDownRight className="w-4 h-4 text-gray-500 shrink-0" />
            <span className="text-gray-700">
              Showing exact literal results for <strong className="font-bold text-[#0b1d3a]">"{originalQuery}"</strong>.
            </span>
          </div>

          <button
            type="button"
            onClick={onToggleCorrection}
            className="self-end sm:self-auto text-[11px] font-bold text-[#ff6b00] hover:text-[#e55f00] flex items-center gap-1 transition-colors cursor-pointer shrink-0"
          >
            <span>Switch to "{resolvedTerm}"</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </>
      )}
    </div>
  );
};
