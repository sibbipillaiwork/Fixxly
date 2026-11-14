import React, { useState } from 'react';
import { Camera, X, Scan, Sparkles } from 'lucide-react';

interface CameraSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPhotoSelected: (query: string) => void;
}

export const CameraSearchModal: React.FC<CameraSearchModalProps> = ({
  isOpen,
  onClose,
  onPhotoSelected
}) => {
  const [analyzing, setAnalyzing] = useState(false);

  const photoOptions = [
    {
      title: "Plumbing Joint Gasket",
      query: "pipe ka ring",
      image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=300&q=80",
      tag: "O-Ring / Gasket Detected"
    },
    {
      title: "Bathroom Tap Dripping",
      query: "tap leaking",
      image: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=300&q=80",
      tag: "Faucet Leak Detected"
    },
    {
      title: "Wall Dampness / Seepage",
      query: "water leakage",
      image: "https://images.unsplash.com/photo-1590402494682-cd3fb53b1f70?auto=format&fit=crop&w=300&q=80",
      tag: "Wall Seepage Detected"
    }
  ];

  const handleSelectPhoto = (query: string) => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      onPhotoSelected(query);
      onClose();
    }, 600);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div 
        className="bg-white rounded-2xl w-full max-w-md shadow-2xl border border-gray-100 p-6 animate-slide-down relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-4">
          <div className="w-12 h-12 rounded-xl bg-orange-100 text-[#ff6b00] flex items-center justify-center mx-auto mb-2">
            <Camera className="w-6 h-6" />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-[#0b1d3a]">
            Fixxly Trade Lens Scanner
          </h3>
          <p className="text-xs text-gray-500">
            Snap damaged parts or blueprints to instantly match genuine SKU replacements
          </p>
        </div>

        {analyzing ? (
          <div className="py-12 text-center space-y-3">
            <div className="w-16 h-16 border-4 border-[#ff6b00] border-t-transparent rounded-full animate-spin mx-auto" />
            <div className="text-sm font-bold text-[#0b1d3a]">
              Analyzing trade hardware specs...
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-[#ff6b00]" />
              Select a sample site photo to test:
            </span>

            <div className="grid grid-cols-3 gap-2">
              {photoOptions.map((opt) => (
                <div
                  key={opt.query}
                  onClick={() => handleSelectPhoto(opt.query)}
                  className="group rounded-xl border border-gray-200 hover:border-[#ff6b00] p-1.5 cursor-pointer transition-all hover:shadow-md bg-white text-center"
                >
                  <div className="aspect-square rounded-lg overflow-hidden mb-1.5 relative bg-gray-100">
                    <img
                      src={opt.image}
                      alt={opt.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 bg-[#0b1d3a]/20 group-hover:bg-transparent transition-colors flex items-center justify-center">
                      <Scan className="w-5 h-5 text-white drop-shadow" />
                    </div>
                  </div>
                  <div className="text-[11px] font-bold text-gray-900 line-clamp-1">
                    {opt.title}
                  </div>
                  <div className="text-[10px] text-green-700 font-medium">
                    {opt.tag}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 bg-gray-50 rounded-xl text-center border border-dashed border-gray-300">
              <span className="text-xs text-gray-600 block mb-1">
                Have a part or photo on your phone?
              </span>
              <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0b1d3a] text-white text-xs font-bold cursor-pointer hover:bg-[#132c54] transition-colors">
                <Camera className="w-3.5 h-3.5" />
                <span>Upload Site Photo</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={() => handleSelectPhoto("pipe ka ring")}
                />
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
