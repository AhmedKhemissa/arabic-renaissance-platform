
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Book, GraduationCap, Layers, Info, Menu, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { t, language } = useLanguage();
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);
  
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);
  
  const navLinks = [
    { name: t('dictionary'), path: "/dictionary", icon: <Book className="w-4 h-4" /> },
    { name: t('activities'), path: "/activities", icon: <GraduationCap className="w-4 h-4" /> },
    { name: t('levelTest'), path: "/level-test", icon: <Layers className="w-4 h-4" /> },
    { name: t('aboutUs'), path: "/about", icon: <Info className="w-4 h-4" /> },
  ];

  const rtlClass = language === 'ar' ? 'flex-row-reverse text-right' : '';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md shadow-subtle' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 py-4">
        <nav className={`flex items-center justify-between ${rtlClass}`}>
          <Link 
            to="/" 
            className={`text-primary font-semibold text-xl tracking-tight flex items-center gap-2 transition-transform duration-300 hover:scale-[1.02] ${language === 'ar' ? 'flex-row-reverse' : ''}`}
          >
            <span className="text-2xl">مرحبا</span>
            <span className="text-primary font-normal">| {t('appName')}</span>
          </Link>
          
          <div className={`hidden md:flex items-center ${language === 'ar' ? 'flex-row-reverse space-x-reverse' : 'space-x-6'}`}>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 
                ${location.pathname === link.path 
                  ? 'text-primary bg-primary/5 shadow-subtle' 
                  : 'text-foreground/80 hover:text-primary hover:bg-primary/5'}
                ${language === 'ar' ? 'flex-row-reverse' : ''}`}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
            <div className="ml-2">
              <LanguageSwitcher />
            </div>
          </div>
          
          <div className="md:hidden flex items-center gap-2">
            <LanguageSwitcher />
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full bg-primary/5 text-foreground hover:bg-primary/10 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </div>
      
      <div 
        className={`md:hidden fixed inset-0 z-40 bg-white transform transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="container mx-auto px-4 py-20">
          <div className={`flex flex-col space-y-6 ${language === 'ar' ? 'items-end' : ''}`}>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-lg w-full
                ${location.pathname === link.path 
                  ? 'text-primary bg-primary/5 font-medium' 
                  : 'text-foreground/90 hover:bg-accent'}
                ${language === 'ar' ? 'flex-row-reverse justify-end' : ''}`}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
