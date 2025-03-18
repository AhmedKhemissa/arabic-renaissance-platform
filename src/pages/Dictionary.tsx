
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import DictionaryResult from '../components/DictionaryResult';
import { staggeredAnimation } from '../lib/animations';

// Mock data for demonstration
const mockWords = {
  "مرحبا": {
    word: "مرحبا",
    phonetic: "/marHaban/",
    meanings: [
      {
        partOfSpeech: "interjection",
        definitions: [
          {
            definition: "A greeting used to welcome someone.",
            example: "مرحبا، كيف حالك؟"
          }
        ]
      }
    ]
  },
  "كتاب": {
    word: "كتاب",
    phonetic: "/kitāb/",
    meanings: [
      {
        partOfSpeech: "noun",
        definitions: [
          {
            definition: "A written or printed work consisting of pages bound together.",
            example: "أنا أقرأ كتابا عن التاريخ."
          },
          {
            definition: "A main division of a literary work.",
            example: "الكتاب الأول من الرواية."
          }
        ]
      }
    ]
  }
};

const Dictionary = () => {
  const [searchResults, setSearchResults] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  
  useEffect(() => {
    // Load recent searches from local storage
    const savedSearches = localStorage.getItem('recentSearches');
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }
    
    // Apply animations
    staggeredAnimation('.search-suggestion', 50);
  }, []);
  
  const handleSearch = (term: string) => {
    setIsLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      // Check if the search term matches our mock data
      if (mockWords[term as keyof typeof mockWords]) {
        setSearchResults(mockWords[term as keyof typeof mockWords]);
      } else {
        // No results found - in a real app, you might show a "no results" message
        setSearchResults({
          word: term,
          phonetic: "/?/",
          meanings: [
            {
              partOfSpeech: "unknown",
              definitions: [
                {
                  definition: "No results found for this term. Please try another search.",
                }
              ]
            }
          ]
        });
      }
      
      // Update recent searches
      if (!recentSearches.includes(term)) {
        const updatedSearches = [term, ...recentSearches].slice(0, 5);
        setRecentSearches(updatedSearches);
        localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
      }
      
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24">
        <div className="page-container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-semibold mb-4">Arabic Dictionary</h1>
              <p className="text-lg text-foreground/70">
                Search for Arabic words to find their meanings, pronunciations, and examples.
              </p>
            </div>
            
            <SearchBar onSearch={handleSearch} />
            
            {/* Recent searches */}
            {recentSearches.length > 0 && !searchResults && (
              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground mb-2">Recent searches:</p>
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
              word={searchResults?.word}
              phonetic={searchResults?.phonetic}
              meanings={searchResults?.meanings}
              isLoading={isLoading}
            />
            
            {/* Empty state suggestion */}
            {!searchResults && !isLoading && (
              <div className="mt-16 text-center py-12 border-t border-border/40">
                <p className="text-lg text-muted-foreground mb-4">
                  Try searching for these example words:
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  <button
                    onClick={() => handleSearch("مرحبا")}
                    className="px-4 py-2 bg-primary/10 rounded-lg text-primary hover:bg-primary/20 transition-colors"
                  >
                    مرحبا (Hello)
                  </button>
                  <button
                    onClick={() => handleSearch("كتاب")}
                    className="px-4 py-2 bg-primary/10 rounded-lg text-primary hover:bg-primary/20 transition-colors"
                  >
                    كتاب (Book)
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
