import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Book, Image, Mic, Volume, GraduationCap, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
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
    { name: "Dictionary", path: "/dictionary", icon: <Book className="w-4 h-4" /> },
    { name: "Image Generator", path: "/image-generator", icon: <Image className="w-4 h-4" /> },
    { name: "Speech to Text", path: "/speech-to-text", icon: <Mic className="w-4 h-4" /> },
    { name: "Text to Speech", path: "/text-to-speech", icon: <Volume className="w-4 h-4" /> },
    { name: "Activities", path: "/activities", icon: <GraduationCap className="w-4 h-4" /> },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md shadow-subtle' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link 
            to="/" 
            className="text-primary font-semibold text-xl tracking-tight flex items-center gap-2 transition-transform duration-300 hover:scale-[1.02]"
          >
            <span className="text-2xl">مرحبا</span>
            <span className="text-primary font-normal">| Arabic Renaissance</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 
                ${location.pathname === link.path 
                  ? 'text-primary bg-primary/5 shadow-subtle' 
                  : 'text-foreground/80 hover:text-primary hover:bg-primary/5'}`}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
          </div>
          
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full bg-primary/5 text-foreground hover:bg-primary/10 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>
      </div>
      
      <div 
        className={`md:hidden fixed inset-0 z-40 bg-white transform transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="container mx-auto px-4 py-20">
          <div className="flex flex-col space-y-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-lg 
                ${location.pathname === link.path 
                  ? 'text-primary bg-primary/5 font-medium' 
                  : 'text-foreground/90 hover:bg-accent'}`}
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
