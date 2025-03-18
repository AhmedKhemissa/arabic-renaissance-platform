
import React from 'react';
import { Volume, Award, Book, Tag, Sparkles, FileText, Repeat, Dices, Italic } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { WordData } from '../services/dictionaryService';

interface DictionaryResultProps {
  wordData?: WordData | null;
  isLoading?: boolean;
}

const DictionaryResult: React.FC<DictionaryResultProps> = ({
  wordData,
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

  if (!wordData) {
    return null;
  }

  const handlePlayPronunciation = () => {
    // This would be implemented with the text-to-speech API
    const utterance = new SpeechSynthesisUtterance(wordData.word);
    utterance.lang = 'ar';
    window.speechSynthesis.speak(utterance);
  };

  const getCefrBadgeColor = (level: string) => {
    const levelMap: Record<string, string> = {
      'A1': 'bg-emerald-100 text-emerald-800',
      'A2': 'bg-emerald-200 text-emerald-800',
      'B1': 'bg-blue-100 text-blue-800',
      'B2': 'bg-blue-200 text-blue-800',
      'C1': 'bg-purple-100 text-purple-800',
      'C2': 'bg-purple-200 text-purple-800',
    };
    
    // Check if the level starts with any of our keys
    for (const key in levelMap) {
      if (level.includes(key)) {
        return levelMap[key];
      }
    }
    
    // Default color
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="max-w-2xl mx-auto p-8 mt-8 bg-white rounded-xl border border-border/60 shadow-subtle animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-semibold">{wordData.word}</h2>
          {wordData.phonetic && (
            <p className="text-muted-foreground mt-1">{wordData.phonetic}</p>
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

      <div className="flex flex-wrap gap-2 mt-4">
        {wordData.cefrLevel && wordData.cefrLevel !== "غير متوفر" && (
          <Badge variant="outline" className={`${getCefrBadgeColor(wordData.cefrLevel)} border-0`}>
            {wordData.cefrLevel}
          </Badge>
        )}
        {wordData.field && wordData.field !== "غير متوفر" && (
          <Badge variant="outline" className="bg-secondary/10 text-secondary border-0">
            {wordData.field}
          </Badge>
        )}
        {wordData.partOfSpeech && wordData.partOfSpeech !== "غير متوفر" && (
          <Badge variant="outline" className="bg-primary/10 text-primary border-0">
            {wordData.partOfSpeech}
          </Badge>
        )}
      </div>

      <div className="mt-8 space-y-6">
        {/* Definition */}
        <div className="animate-slide-up">
          <div className="flex items-center gap-2 text-lg font-medium text-primary mb-3">
            <FileText className="w-5 h-5" />
            <h3>التعريف</h3>
          </div>
          <p className="text-foreground">{wordData.definition}</p>
        </div>

        {/* Root/Lemma */}
        {wordData.lemma && wordData.lemma !== "غير متوفر" && (
          <div className="animate-slide-up" style={{ animationDelay: '100ms' }}>
            <div className="flex items-center gap-2 text-lg font-medium text-primary mb-3">
              <Sparkles className="w-5 h-5" />
              <h3>الجذر</h3>
            </div>
            <p className="text-foreground">{wordData.lemma}</p>
          </div>
        )}

        {/* Example */}
        {wordData.example && wordData.example !== "غير متوفر" && (
          <div className="animate-slide-up" style={{ animationDelay: '200ms' }}>
            <div className="flex items-center gap-2 text-lg font-medium text-primary mb-3">
              <Italic className="w-5 h-5" />
              <h3>مثال</h3>
            </div>
            <p className="pl-4 border-l-2 border-muted italic text-muted-foreground">
              "{wordData.example}"
            </p>
          </div>
        )}

        {/* Synonyms */}
        {wordData.synonyms && wordData.synonyms !== "غير متوفر" && (
          <div className="animate-slide-up" style={{ animationDelay: '300ms' }}>
            <div className="flex items-center gap-2 text-lg font-medium text-primary mb-3">
              <Repeat className="w-5 h-5" />
              <h3>المرادفات</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {wordData.synonyms.split('،').map((synonym, index) => (
                <Badge 
                  key={index} 
                  variant="outline"
                  className="bg-accent hover:bg-accent/70 cursor-pointer transition-colors"
                >
                  {synonym.trim()}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Antonyms */}
        {wordData.antonyms && wordData.antonyms !== "غير متوفر" && (
          <div className="animate-slide-up" style={{ animationDelay: '400ms' }}>
            <div className="flex items-center gap-2 text-lg font-medium text-primary mb-3">
              <Dices className="w-5 h-5" />
              <h3>الأضداد</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {wordData.antonyms.split('،').map((antonym, index) => (
                <Badge 
                  key={index} 
                  variant="outline"
                  className="bg-secondary/10 hover:bg-secondary/20 cursor-pointer transition-colors"
                >
                  {antonym.trim()}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DictionaryResult;
