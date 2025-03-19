
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import DictionaryResult from '../components/DictionaryResult';
import { fetchWordData, WordData, isArabicWord } from '../services/dictionaryService';
import { toast } from "sonner";
import { useLanguage } from '@/contexts/LanguageContext';

const Dictionary = () => {
  const [searchResults, setSearchResults] = useState<WordData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const { t, language } = useLanguage();
  
  useEffect(() => {
    // Load recent searches from local storage
    const savedSearches = localStorage.getItem('recentSearches');
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }
    
    // Apply animations after component mounts
    const applyAnimations = () => {
      const elements = document.querySelectorAll('.search-suggestion');
      elements.forEach((el, index) => {
        const element = el as HTMLElement;
        element.style.opacity = '0';
        element.style.transform = 'translateY(10px)';
        element.style.transition = 'opacity 0.4s ease-out, transform 0.4s ease-out';
        
        setTimeout(() => {
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
        }, 50 * index);
      });
    };
    
    applyAnimations();
  }, []);
  
  const handleSearch = async (term: string) => {
    if (!isArabicWord(term)) {
      toast.error("يُسمح فقط بالكلمات العربية. حاول مرة أخرى!");
      return;
    }
    
    setIsLoading(true);
    
    try {
      const wordData = await fetchWordData(term);
      
      if (wordData) {
        setSearchResults(wordData);
        
        // Update recent searches
        if (!recentSearches.includes(term)) {
          const updatedSearches = [term, ...recentSearches].slice(0, 5);
          setRecentSearches(updatedSearches);
          localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
        }
      }
    } catch (error) {
      console.error("Error in search:", error);
      toast.error("حدث خطأ أثناء البحث. يرجى المحاولة مرة أخرى.");
    } finally {
      setIsLoading(false);
    }
  };

  // Direction class for RTL/LTR
  const rtlClass = language === 'ar' ? 'text-right' : '';

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className={`text-center mb-12 ${rtlClass}`}>
              <h1 className="text-4xl font-semibold mb-4">
                {language === 'ar' 
                  ? 'قاموس اللغة العربية الذكي'
                  : language === 'fr'
                    ? 'Dictionnaire Arabe Intelligent'
                    : 'Smart Arabic Dictionary'}
              </h1>
              <p className="text-lg text-foreground/70">
                {language === 'ar'
                  ? 'ابحث عن الكلمات العربية لمعرفة معانيها وأصولها وأمثلة استخدامها'
                  : language === 'fr'
                    ? 'Recherchez des mots arabes pour connaître leurs significations, origines et exemples d\'utilisation'
                    : 'Search for Arabic words to discover their meanings, origins, and usage examples'}
              </p>
            </div>
            
            <SearchBar 
              onSearch={handleSearch} 
              placeholder={language === 'ar'
                ? "ابحث عن كلمة باللغة العربية..."
                : language === 'fr'
                  ? "Rechercher un mot en arabe..."
                  : "Search for an Arabic word..."} 
            />
            
            {/* Recent searches */}
            {recentSearches.length > 0 && !searchResults && (
              <div className={`mt-6 text-center ${rtlClass}`}>
                <p className="text-sm text-muted-foreground mb-2">
                  {language === 'ar'
                    ? 'عمليات البحث الأخيرة:'
                    : language === 'fr'
                      ? 'Recherches récentes :'
                      : 'Recent searches:'}
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {recentSearches.map((term, index) => (
                    <button
                      key={index}
                      onClick={() => handleSearch(term)}
                      className="search-suggestion px-3 py-1.5 bg-accent rounded-lg text-sm hover:bg-accent/70 transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Results */}
            <DictionaryResult 
              wordData={searchResults}
              isLoading={isLoading}
            />
            
            {/* Empty state suggestion */}
            {!searchResults && !isLoading && (
              <div className={`mt-16 text-center py-12 border-t border-border/40 ${rtlClass}`}>
                <p className="text-lg text-muted-foreground mb-4">
                  {language === 'ar'
                    ? 'جرّب البحث عن هذه الكلمات كأمثلة:'
                    : language === 'fr'
                      ? 'Essayez de rechercher ces mots comme exemples :'
                      : 'Try searching for these example words:'}
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  <button
                    onClick={() => handleSearch("مرحبا")}
                    className="px-4 py-2 bg-primary/10 rounded-lg text-primary hover:bg-primary/20 transition-colors"
                  >
                    مرحبا {language !== 'ar' && '(Hello)'}
                  </button>
                  <button
                    onClick={() => handleSearch("كتاب")}
                    className="px-4 py-2 bg-primary/10 rounded-lg text-primary hover:bg-primary/20 transition-colors"
                  >
                    كتاب {language !== 'ar' && '(Book)'}
                  </button>
                  <button
                    onClick={() => handleSearch("قمر")}
                    className="px-4 py-2 bg-primary/10 rounded-lg text-primary hover:bg-primary/20 transition-colors"
                  >
                    قمر {language !== 'ar' && '(Moon)'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dictionary;
