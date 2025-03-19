
import React, { useState, useRef, useEffect } from 'react';
import { Search, X, Mic, MicOff, Loader2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from "sonner";

interface SearchBarProps {
  onSearch: (term: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  placeholder = "Search for an Arabic word or phrase..." 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { t, language } = useLanguage();
  
  // Check if speech recognition is supported
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      setSpeechSupported(true);
    } else {
      setSpeechSupported(false);
      console.log("Speech recognition not supported in this browser");
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
    }
  };
  
  const clearSearch = () => {
    setSearchTerm('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const toggleListening = () => {
    if (!speechSupported) {
      toast.error(t('speech_not_supported'));
      return;
    }

    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const startListening = () => {
    if (!speechSupported) return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    // Configure recognition
    recognition.lang = 'ar-SA'; // Arabic (Saudi Arabia)
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    
    recognition.onstart = () => {
      setIsListening(true);
      toast.info(t('listening'));
    };
    
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setSearchTerm(transcript);
      
      // Auto-submit after successful recognition
      setTimeout(() => {
        if (transcript.trim()) {
          onSearch(transcript.trim());
        }
      }, 500);
    };
    
    recognition.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      setIsListening(false);
      toast.error(t('speech_error'));
    };
    
    recognition.onend = () => {
      setIsListening(false);
    };
    
    recognition.start();
  };

  const stopListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.stop();
    setIsListening(false);
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className={`w-full max-w-2xl mx-auto transition-all duration-300 ${
        isFocused 
          ? 'scale-[1.02] shadow-hover' 
          : 'shadow-subtle'
      }`}
    >
      <div className="relative">
        <div className={`absolute inset-y-0 ${language === 'ar' ? 'right-0 pr-4' : 'left-0 pl-4'} flex items-center pointer-events-none`}>
          <Search className="h-5 w-5 text-muted-foreground" />
        </div>
        
        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className={`w-full py-4 ${language === 'ar' ? 'pr-12 pl-12 text-right' : 'pl-12 pr-12'} bg-white border border-border focus:border-primary/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all`}
          dir={language === 'ar' ? 'rtl' : 'ltr'}
        />
        
        {searchTerm && (
          <button
            type="button"
            onClick={clearSearch}
            className={`absolute inset-y-0 ${language === 'ar' ? 'left-14' : 'right-14'} flex items-center ${language === 'ar' ? 'pl-2' : 'pr-2'}`}
          >
            <X className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
          </button>
        )}
        
        {/* Speech recognition button */}
        {speechSupported && (
          <button
            type="button"
            onClick={toggleListening}
            className={`absolute inset-y-0 ${language === 'ar' ? 'left-24' : 'right-24'} flex items-center ${language === 'ar' ? 'pl-2' : 'pr-2'}`}
          >
            {isListening ? (
              <div className="relative">
                <MicOff className="h-5 w-5 text-destructive hover:text-destructive/80 transition-colors" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full animate-ping"></span>
              </div>
            ) : (
              <Mic className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
            )}
          </button>
        )}
        
        <button
          type="submit"
          className={`absolute inset-y-0 ${language === 'ar' ? 'left-0' : 'right-0'} ${language === 'ar' ? 'pl-3' : 'pr-3'} flex items-center`}
        >
          <span className="px-3 py-1.5 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors text-sm font-medium">
            {t('search')}
          </span>
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
