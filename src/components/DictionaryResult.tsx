import React, { useState, useEffect } from 'react';
import { Volume, Award, Book, Tag, Sparkles, FileText, Repeat, Dices, Italic, Image } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { WordData } from '../services/dictionaryService';
import { toast } from "sonner";
import { useLanguage } from '@/contexts/LanguageContext';
import { fetchWordImage } from '../services/imageService';

interface DictionaryResultProps {
  wordData?: WordData | null;
  isLoading?: boolean;
}

const DictionaryResult: React.FC<DictionaryResultProps> = ({
  wordData,
  isLoading = false,
}) => {
  const { t, language } = useLanguage();
  const [imageLoading, setImageLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);
  
  useEffect(() => {
    setImageUrl(null);
    setImageError(false);
    
    if (wordData && wordData.word) {
      loadWordImage(wordData.word);
    }
  }, [wordData]);
  
  const loadWordImage = async (word: string) => {
    if (imageLoading) return;
    
    setImageLoading(true);
    setImageError(false);
    
    try {
      const imageUrl = await fetchWordImage(word);
      setImageUrl(imageUrl);
      if (!imageUrl) {
        setImageError(true);
      }
    } catch (error) {
      console.error('Image fetch error:', error);
      setImageError(true);
      toast.error("حدث خطأ أثناء جلب الصورة");
    } finally {
      setImageLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto p-8 mt-8 bg-background rounded-xl border border-border/60 shadow-subtle animate-pulse dark:bg-background/30">
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
    if (!wordData.word) return;
    
    try {
      const msg = new SpeechSynthesisUtterance();
      msg.text = wordData.word;
      msg.lang = 'ar-SA';
      msg.rate = 0.8;
      msg.pitch = 1;
      msg.volume = 1;
      
      const voices = window.speechSynthesis.getVoices();
      const arabicVoice = voices.find(voice => 
        voice.lang.includes('ar') || voice.name.includes('Arabic')
      );
      
      if (arabicVoice) {
        msg.voice = arabicVoice;
      }
      
      msg.onstart = () => console.log('Started speaking');
      msg.onend = () => console.log('Finished speaking');
      msg.onerror = (e) => {
        console.error('Speech error:', e);
        toast.error("حدث خطأ أثناء النطق");
      };
      
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(msg);
      
      toast.success("جاري نطق الكلمة");
    } catch (error) {
      console.error('TTS error:', error);
      toast.error("حدث خطأ أثناء النطق");
    }
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
    
    for (const key in levelMap) {
      if (level.includes(key)) {
        return levelMap[key];
      }
    }
    
    return 'bg-gray-100 text-gray-800';
  };

  const rtlClass = language === 'ar' ? 'text-right' : '';

  return (
    <div className={`max-w-2xl mx-auto p-8 mt-8 bg-background rounded-xl border border-border/60 shadow-subtle animate-fade-in ${rtlClass} dark:bg-background/30 dark:border-border/30`}>
      <div className={`flex items-center ${language === 'ar' ? 'flex-row-reverse' : ''} justify-between`}>
        <div className="flex items-center gap-4">
          {imageUrl && (
            <div className="w-16 h-16 rounded-lg overflow-hidden border-2 border-primary/20 flex-shrink-0">
              <img 
                src={imageUrl} 
                alt={wordData.word} 
                className="w-full h-full object-cover"
                onError={() => setImageError(true)}
              />
            </div>
          )}
          {imageLoading && (
            <div className="w-16 h-16 rounded-lg overflow-hidden border-2 border-primary/20 bg-muted animate-pulse flex-shrink-0"></div>
          )}
          {imageError && (
            <div className="w-16 h-16 rounded-lg overflow-hidden border-2 border-primary/20 bg-muted flex items-center justify-center flex-shrink-0">
              <Image className="w-6 h-6 text-muted-foreground" />
            </div>
          )}
          
          <div>
            <h2 className="text-3xl font-semibold">{wordData.word}</h2>
            {wordData.phonetic && (
              <p className="text-muted-foreground mt-1">{wordData.phonetic}</p>
            )}
          </div>
        </div>
        <button 
          onClick={handlePlayPronunciation}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors active:scale-95 dark:bg-primary/20 dark:hover:bg-primary/30"
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
        <div className="animate-slide-up">
          <div className={`flex items-center gap-2 text-lg font-medium text-primary mb-3 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
            <FileText className="w-5 h-5" />
            <h3>{t('definition')}</h3>
          </div>
          <p className="text-foreground">{wordData.definition}</p>
        </div>

        {wordData.lemma && wordData.lemma !== "غير متوفر" && (
          <div className="animate-slide-up" style={{ animationDelay: '100ms' }}>
            <div className={`flex items-center gap-2 text-lg font-medium text-primary mb-3 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
              <Sparkles className="w-5 h-5" />
              <h3>{t('root')}</h3>
            </div>
            <p className="text-foreground">{wordData.lemma}</p>
          </div>
        )}

        {wordData.example && wordData.example !== "غير متوفر" && (
          <div className="animate-slide-up" style={{ animationDelay: '200ms' }}>
            <div className={`flex items-center gap-2 text-lg font-medium text-primary mb-3 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
              <Italic className="w-5 h-5" />
              <h3>{t('example')}</h3>
            </div>
            <p className={`pl-4 border-l-2 border-muted italic text-muted-foreground ${language === 'ar' ? 'pr-4 pl-0 border-r-2 border-l-0 text-right' : ''}`}>
              "{wordData.example}"
            </p>
          </div>
        )}

        {wordData.synonyms && wordData.synonyms !== "غير متوفر" && (
          <div className="animate-slide-up" style={{ animationDelay: '300ms' }}>
            <div className={`flex items-center gap-2 text-lg font-medium text-primary mb-3 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
              <Repeat className="w-5 h-5" />
              <h3>{t('synonyms')}</h3>
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

        {wordData.antonyms && wordData.antonyms !== "غير متوفر" && (
          <div className="animate-slide-up" style={{ animationDelay: '400ms' }}>
            <div className={`flex items-center gap-2 text-lg font-medium text-primary mb-3 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
              <Dices className="w-5 h-5" />
              <h3>{t('antonyms')}</h3>
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
