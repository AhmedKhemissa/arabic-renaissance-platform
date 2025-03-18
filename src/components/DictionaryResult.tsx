
import React from 'react';
import { Volume } from 'lucide-react';

interface DictionaryResultProps {
  word?: string;
  phonetic?: string;
  meanings?: {
    partOfSpeech: string;
    definitions: {
      definition: string;
      example?: string;
    }[];
  }[];
  isLoading?: boolean;
}

const DictionaryResult: React.FC<DictionaryResultProps> = ({
  word,
  phonetic,
  meanings,
  isLoading = false,
}) => {
  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto p-8 mt-8 bg-white rounded-xl border border-border/60 shadow-subtle animate-pulse">
        <div className="h-8 bg-muted rounded w-1/3 mb-4"></div>
        <div className="h-4 bg-muted rounded w-1/4 mb-6"></div>
        <div className="space-y-4">
          <div className="h-6 bg-muted rounded w-1/5 mb-2"></div>
          <div className="h-4 bg-muted rounded w-full mb-1"></div>
          <div className="h-4 bg-muted rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  if (!word) {
    return null;
  }

  const handlePlayPronunciation = () => {
    // This would be implemented with the text-to-speech API
    console.log("Playing pronunciation for:", word);
  };

  return (
    <div className="max-w-2xl mx-auto p-8 mt-8 bg-white rounded-xl border border-border/60 shadow-subtle animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-semibold">{word}</h2>
          {phonetic && (
            <p className="text-muted-foreground mt-1">{phonetic}</p>
          )}
        </div>
        <button 
          onClick={handlePlayPronunciation}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
          aria-label="Play pronunciation"
        >
          <Volume className="w-5 h-5" />
        </button>
      </div>

      <div className="mt-8 space-y-6">
        {meanings?.map((meaning, index) => (
          <div key={index} className="animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
            <h3 className="text-lg font-medium text-primary mb-3">
              {meaning.partOfSpeech}
            </h3>
            <ul className="space-y-4">
              {meaning.definitions.map((def, idx) => (
                <li key={idx} className="pl-4 border-l-2 border-muted">
                  <p className="text-foreground">{def.definition}</p>
                  {def.example && (
                    <p className="mt-1.5 text-muted-foreground text-sm">
                      "
                      {def.example}
                      "
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DictionaryResult;
