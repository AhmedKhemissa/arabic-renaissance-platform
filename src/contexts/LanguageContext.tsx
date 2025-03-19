
import React, { createContext, useContext, useState, useEffect } from 'react';

// Define available languages
export type Language = 'en' | 'fr' | 'ar';

// Define language context type
type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

// Create the context with a default value
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translations for different languages
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navbar
    'dictionary': 'Dictionary',
    'activities': 'Activities',
    'levelTest': 'Level Test',
    'aboutUs': 'About Us',
    // Pages
    'appName': 'Arabic Renaissance',
    'about': 'About Us',
    'aboutSubtitle': 'Learn more about our mission to promote Arabic language learning',
    'mission': 'Our Mission',
    'approach': 'Our Approach',
    'team': 'Our Team',
    // Activities page
    'activitiesPage': 'Arabic Learning Activities',
    'activitiesSubtitle': 'Enhance your Arabic language skills with our interactive activities',
    'vocabulary': 'Vocabulary Practice',
    'vocabularyDesc': 'Master essential Arabic vocabulary through interactive exercises',
    'grammar': 'Grammar Exercises',
    'grammarDesc': 'Strengthen your understanding of Arabic grammar rules',
    'reading': 'Reading Comprehension',
    'readingDesc': 'Improve your reading skills with short Arabic texts',
    'startActivity': 'Start Activity',
    // Level test
    'levelTestPage': 'Arabic Level Test',
    'levelTestSubtitle': 'Discover your current Arabic proficiency level with our comprehensive assessment',
    'aboutTest': 'About the Test',
    'testDesc': 'Our Arabic level assessment will evaluate your skills in reading, writing, vocabulary, and grammar. The test takes approximately 20-30 minutes to complete.',
    'whatToExpect': 'What to Expect:',
    'startAssessment': 'Start Assessment',
    'resultsImmediate': 'You\'ll receive your results immediately after completion',
    // Not found
    'notFound': 'Page Not Found',
    'notFoundDesc': 'The page you are looking for doesn\'t exist or has been moved.',
    'backToHome': 'Back to Home',
    // Dictionary
    'definition': 'Definition',
    'root': 'Root',
    'example': 'Example',
    'synonyms': 'Synonyms',
    'antonyms': 'Antonyms',
    'search': 'Search',
    // Language
    'language': 'Language',
    'english': 'English',
    'french': 'French',
    'arabic': 'Arabic',
    // Speech recognition
    'listening': 'Listening... Speak now',
    'speech_not_supported': 'Speech recognition is not supported in your browser',
    'speech_error': 'Error recognizing speech. Please try again',
  },
  fr: {
    // Navbar
    'dictionary': 'Dictionnaire',
    'activities': 'Activités',
    'levelTest': 'Test de niveau',
    'aboutUs': 'À propos',
    // Pages
    'appName': 'Renaissance Arabe',
    'about': 'À propos',
    'aboutSubtitle': 'En savoir plus sur notre mission de promotion de l\'apprentissage de la langue arabe',
    'mission': 'Notre Mission',
    'approach': 'Notre Approche',
    'team': 'Notre Équipe',
    // Activities page
    'activitiesPage': 'Activités d\'apprentissage de l\'arabe',
    'activitiesSubtitle': 'Améliorez vos compétences en langue arabe avec nos activités interactives',
    'vocabulary': 'Pratique du vocabulaire',
    'vocabularyDesc': 'Maîtrisez le vocabulaire arabe essentiel grâce à des exercices interactifs',
    'grammar': 'Exercices de grammaire',
    'grammarDesc': 'Renforcez votre compréhension des règles grammaticales arabes',
    'reading': 'Compréhension de lecture',
    'readingDesc': 'Améliorez vos compétences en lecture avec de courts textes arabes',
    'startActivity': 'Commencer l\'activité',
    // Level test
    'levelTestPage': 'Test de niveau d\'arabe',
    'levelTestSubtitle': 'Découvrez votre niveau de compétence actuel en arabe avec notre évaluation complète',
    'aboutTest': 'À propos du test',
    'testDesc': 'Notre évaluation du niveau d\'arabe évaluera vos compétences en lecture, écriture, vocabulaire et grammaire. Le test prend environ 20-30 minutes.',
    'whatToExpect': 'À quoi s\'attendre:',
    'startAssessment': 'Commencer l\'évaluation',
    'resultsImmediate': 'Vous recevrez vos résultats immédiatement après avoir terminé',
    // Not found
    'notFound': 'Page non trouvée',
    'notFoundDesc': 'La page que vous recherchez n\'existe pas ou a été déplacée.',
    'backToHome': 'Retour à l\'accueil',
    // Dictionary
    'definition': 'Définition',
    'root': 'Racine',
    'example': 'Exemple',
    'synonyms': 'Synonymes',
    'antonyms': 'Antonymes',
    'search': 'Rechercher',
    // Language
    'language': 'Langue',
    'english': 'Anglais',
    'french': 'Français',
    'arabic': 'Arabe',
    // Speech recognition
    'listening': 'Écoute en cours... Parlez maintenant',
    'speech_not_supported': 'La reconnaissance vocale n\'est pas prise en charge par votre navigateur',
    'speech_error': 'Erreur lors de la reconnaissance vocale. Veuillez réessayer',
  },
  ar: {
    // Navbar
    'dictionary': 'القاموس',
    'activities': 'الأنشطة',
    'levelTest': 'اختبار المستوى',
    'aboutUs': 'من نحن',
    // Pages
    'appName': 'النهضة العربية',
    'about': 'من نحن',
    'aboutSubtitle': 'تعرف على مهمتنا في تعزيز تعلم اللغة العربية',
    'mission': 'مهمتنا',
    'approach': 'نهجنا',
    'team': 'فريقنا',
    // Activities page
    'activitiesPage': 'أنشطة تعلم اللغة العربية',
    'activitiesSubtitle': 'عزز مهاراتك في اللغة العربية من خلال أنشطتنا التفاعلية',
    'vocabulary': 'تمارين المفردات',
    'vocabularyDesc': 'أتقن المفردات العربية الأساسية من خلال التمارين التفاعلية',
    'grammar': 'تمارين القواعد',
    'grammarDesc': 'قوي فهمك لقواعد اللغة العربية',
    'reading': 'فهم المقروء',
    'readingDesc': 'حسن مهارات القراءة لديك مع نصوص عربية قصيرة',
    'startActivity': 'ابدأ النشاط',
    // Level test
    'levelTestPage': 'اختبار مستوى اللغة العربية',
    'levelTestSubtitle': 'اكتشف مستوى إتقانك الحالي للغة العربية من خلال تقييمنا الشامل',
    'aboutTest': 'عن الاختبار',
    'testDesc': 'سيقيم اختبار مستوى اللغة العربية لدينا مهاراتك في القراءة والكتابة والمفردات والقواعد. يستغرق الاختبار حوالي 20-30 دقيقة لإكماله.',
    'whatToExpect': 'ماذا تتوقع:',
    'startAssessment': 'بدء التقييم',
    'resultsImmediate': 'ستتلقى نتائجك فور الانتهاء',
    // Not found
    'notFound': 'الصفحة غير موجودة',
    'notFoundDesc': 'الصفحة التي تبحث عنها غير موجودة أو تم نقلها.',
    'backToHome': 'العودة للصفحة الرئيسية',
    // Dictionary
    'definition': 'التعريف',
    'root': 'الجذر',
    'example': 'مثال',
    'synonyms': 'المرادفات',
    'antonyms': 'الأضداد',
    'search': 'بحث',
    // Language
    'language': 'اللغة',
    'english': 'الإنجليزية',
    'french': 'الفرنسية',
    'arabic': 'العربية',
    // Speech recognition
    'listening': 'جاري الاستماع... تحدث الآن',
    'speech_not_supported': 'خاصية التعرف على الصوت غير مدعومة في متصفحك',
    'speech_error': 'حدث خطأ أثناء التعرف على الصوت. يرجى المحاولة مرة أخرى',
  }
};

// Add global type definitions for Web Speech API
declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
}

// Define SpeechRecognition interface
interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  maxAlternatives: number;
  onaudioend: ((this: SpeechRecognition, ev: Event) => any) | null;
  onaudiostart: ((this: SpeechRecognition, ev: Event) => any) | null;
  onend: ((this: SpeechRecognition, ev: Event) => any) | null;
  onerror: ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => any) | null;
  onnomatch: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null;
  onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null;
  onstart: ((this: SpeechRecognition, ev: Event) => any) | null;
  start(): void;
  stop(): void;
  abort(): void;
}

interface SpeechRecognitionEvent extends Event {
  readonly resultIndex: number;
  readonly results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
  readonly error: string;
  readonly message: string;
}

interface SpeechRecognitionResultList {
  readonly length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  readonly length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
  readonly isFinal: boolean;
}

interface SpeechRecognitionAlternative {
  readonly transcript: string;
  readonly confidence: number;
}

// Provider component
export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Try to get stored language preference, default to 'en'
  const [language, setLanguage] = useState<Language>(() => {
    const storedLang = localStorage.getItem('language') as Language;
    return storedLang && ['en', 'fr', 'ar'].includes(storedLang) ? storedLang : 'en';
  });

  // Update document direction when language changes
  useEffect(() => {
    // Store language preference
    localStorage.setItem('language', language);
    
    // Set direction for RTL/LTR languages
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    
    // Add language class to body for specific language styling
    document.body.className = language === 'ar' ? 'font-arabic' : 'font-sans';
  }, [language]);

  // Translation function
  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
