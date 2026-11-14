import React, { useState, useEffect, useRef } from 'react';
import { Mic, X, AlertCircle } from 'lucide-react';

interface VoiceSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVoiceInputSelect: (query: string) => void;
}

export const VoiceSearchModal: React.FC<VoiceSearchModalProps> = ({
  isOpen,
  onClose,
  onVoiceInputSelect
}) => {
  const [isListening, setIsListening] = useState(false);
  const [spokenText, setSpokenText] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (!isOpen) {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {
          // ignore
        }
      }
      setIsListening(false);
      setSpokenText('');
      setErrorMessage(null);
      return;
    }

    setSpokenText('');
    setErrorMessage(null);

    // Initialize Web Speech API if supported
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setIsListening(false);
      setErrorMessage('Voice search is not supported on this browser. Please type your search.');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-IN';

      recognition.onstart = () => {
        setIsListening(true);
        setErrorMessage(null);
      };

      recognition.onresult = (event: any) => {
        let interim = '';
        let final = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const item = event.results[i];
          if (item.isFinal) {
            final += item[0].transcript;
          } else {
            interim += item[0].transcript;
          }
        }

        const currentText = final || interim;
        if (currentText) {
          setSpokenText(currentText);
        }

        if (final) {
          setIsListening(false);
          setTimeout(() => {
            onVoiceInputSelect(final.trim());
            onClose();
          }, 500);
        }
      };

      recognition.onerror = (event: any) => {
        if (event.error === 'not-allowed') {
          setErrorMessage('Microphone access blocked. Please allow mic permissions in your browser.');
        } else if (event.error === 'no-speech') {
          setErrorMessage('No speech detected. Tap the mic to try again.');
        } else {
          setErrorMessage('Could not capture audio. Tap the mic to try again.');
        }
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
      setIsListening(true);
    } catch {
      setIsListening(false);
      setErrorMessage('Could not start microphone. Tap to retry.');
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {
          // ignore
        }
      }
    };
  }, [isOpen, onVoiceInputSelect, onClose]);

  const handleToggleListening = () => {
    if (isListening) {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {
          // ignore
        }
      }
      setIsListening(false);
    } else {
      setErrorMessage(null);
      setSpokenText('');
      if (recognitionRef.current) {
        try {
          recognitionRef.current.start();
          setIsListening(true);
        } catch {
          // Re-init if needed
          const SpeechRecognition =
            (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
          if (SpeechRecognition) {
            const recognition = new SpeechRecognition();
            recognition.continuous = false;
            recognition.interimResults = true;
            recognition.lang = 'en-IN';
            recognition.onstart = () => setIsListening(true);
            recognition.onresult = (event: any) => {
              const res = event.results[event.results.length - 1];
              const text = res[0].transcript;
              setSpokenText(text);
              if (res.isFinal) {
                setTimeout(() => {
                  onVoiceInputSelect(text.trim());
                  onClose();
                }, 500);
              }
            };
            recognition.onerror = () => setIsListening(false);
            recognition.onend = () => setIsListening(false);
            recognitionRef.current = recognition;
            recognition.start();
            setIsListening(true);
          }
        }
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div
        className="bg-white rounded-3xl w-full max-w-sm shadow-2xl border border-gray-100 p-8 text-center animate-slide-down relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
          title="Close voice search"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Status / Header */}
        <div className="mb-6">
          <h3 className="text-xl font-extrabold text-[#0b1d3a] tracking-tight">
            {spokenText ? (
              <span className="text-[#ff6b00]">"{spokenText}"</span>
            ) : isListening ? (
              'Listening...'
            ) : (
              'Tap Mic to Speak'
            )}
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            {isListening
              ? 'Speak now in Hindi, English, or contractor trade terms'
              : 'Tap the microphone icon below to start speaking'}
          </p>
        </div>

        {/* Large Central Microphone Button with Pulse Wave */}
        <div className="my-8 flex justify-center items-center">
          <button
            type="button"
            onClick={handleToggleListening}
            className="relative cursor-pointer focus:outline-none group"
            title={isListening ? 'Tap to stop listening' : 'Tap to start speaking'}
          >
            {/* Outer Pulsing Waves when listening */}
            {isListening && (
              <>
                <div className="w-28 h-28 rounded-full bg-orange-200 animate-ping opacity-60 absolute -inset-2" />
                <div className="w-32 h-32 rounded-full bg-orange-100 animate-pulse opacity-50 absolute -inset-4" />
              </>
            )}

            {/* Core Microphone Circle */}
            <div
              className={`w-24 h-24 rounded-full flex items-center justify-center text-white relative z-10 transition-all duration-300 shadow-xl ${
                isListening
                  ? 'bg-[#ff6b00] scale-105 shadow-orange-500/40 ring-4 ring-orange-200'
                  : 'bg-[#0b1d3a] hover:bg-slate-800 shadow-slate-900/30'
              }`}
            >
              <Mic className={`w-11 h-11 ${isListening ? 'animate-bounce' : ''}`} />
            </div>
          </button>
        </div>

        {/* Dynamic Equalizer / Soundwave visualizer when listening */}
        {isListening && (
          <div className="flex items-center justify-center gap-1.5 h-6 mb-4">
            <span className="w-1 bg-[#ff6b00] rounded-full h-3 animate-pulse" />
            <span className="w-1 bg-[#ff6b00] rounded-full h-5 animate-pulse delay-75" />
            <span className="w-1 bg-[#ff6b00] rounded-full h-2 animate-pulse delay-150" />
            <span className="w-1 bg-[#ff6b00] rounded-full h-6 animate-pulse delay-100" />
            <span className="w-1 bg-[#ff6b00] rounded-full h-4 animate-pulse delay-200" />
            <span className="w-1 bg-[#ff6b00] rounded-full h-2 animate-pulse" />
          </div>
        )}

        {/* Error notification if mic blocked or no speech */}
        {errorMessage && (
          <div className="mt-3 p-2.5 rounded-xl bg-orange-50 border border-orange-200 text-[11px] text-orange-800 flex items-center justify-center gap-1.5 text-center">
            <AlertCircle className="w-3.5 h-3.5 text-orange-600 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Action button */}
        <div className="mt-6">
          <button
            type="button"
            onClick={handleToggleListening}
            className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              isListening
                ? 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                : 'bg-[#ff6b00] hover:bg-orange-600 text-white shadow-md shadow-orange-500/20'
            }`}
          >
            {isListening ? 'Stop Listening' : 'Tap to Speak'}
          </button>
        </div>
      </div>
    </div>
  );
};
