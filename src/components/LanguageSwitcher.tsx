
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';
import { toast } from "sonner";

const LanguageSwitcher = () => {
  const { language, setLanguage, t } = useLanguage();

  const handleLanguageChange = (newLang: 'en' | 'fr' | 'ar') => {
    setLanguage(newLang);
    toast.success(`Language changed to ${t(newLang === 'en' ? 'english' : newLang === 'fr' ? 'french' : 'arabic')}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full bg-primary/5 text-foreground hover:bg-primary/10"
        >
          <Globe className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">{t('language')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem 
          onClick={() => handleLanguageChange('en')}
          className={language === 'en' ? 'bg-accent text-accent-foreground' : ''}
        >
          🇬🇧 {t('english')}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleLanguageChange('fr')}
          className={language === 'fr' ? 'bg-accent text-accent-foreground' : ''}
        >
          🇫🇷 {t('french')}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleLanguageChange('ar')}
          className={language === 'ar' ? 'bg-accent text-accent-foreground' : ''}
        >
          🇸🇦 {t('arabic')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
