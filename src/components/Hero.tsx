import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Book, Image, Mic, Volume } from 'lucide-react';

const Hero = () => {
  const bgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (bgRef.current && textRef.current) {
        const scrollY = window.scrollY;
        bgRef.current.style.transform = `translateY(${scrollY * 0.1}px)`;
        textRef.current.style.transform = `translateY(${scrollY * -0.05}px)`;
        textRef.current.style.opacity = `${1 - Math.min(scrollY / 700, 0.6)}`;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const features = [
    { 
      id: 1, 
      icon: <Book className="w-6 h-6 text-primary" />, 
      title: "Arabic Dictionary", 
      desc: "Comprehensive dictionary with meanings, pronunciation, and examples.",
      link: "/dictionary"
    },
    { 
      id: 2, 
      icon: <Image className="w-6 h-6 text-primary" />, 
      title: "Image Generator", 
      desc: "Generate visual representations of Arabic words to enhance understanding.",
      link: "/image-generator"
    },
    { 
      id: 3, 
      icon: <Mic className="w-6 h-6 text-primary" />, 
      title: "Speech to Text", 
      desc: "Practice pronunciation with real-time feedback on your speaking.",
      link: "/speech-to-text"
    },
    { 
      id: 4, 
      icon: <Volume className="w-6 h-6 text-primary" />, 
      title: "Text to Speech", 
      desc: "Listen to the correct pronunciation of Arabic words and phrases.",
      link: "/text-to-speech"
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden pt-20">
      <div 
        ref={bgRef}
        className="absolute top-0 left-0 right-0 h-[80vh] bg-gradient-to-b from-primary/5 to-transparent -z-10"
        style={{ borderRadius: '0 0 50% 50% / 20%' }}
      />
      
      <div ref={textRef} className="container mx-auto px-4 pt-16 md:pt-24 text-center">
        <h1 className="animate-fade-in text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-foreground">
          <span className="inline-block transform transition-all duration-500 hover:scale-105 text-primary mb-2">مرحبا</span>
          <br />
          <span className="text-balance">Arabic Renaissance Platform</span>
        </h1>
        
        <p className="animate-slide-up mt-6 md:mt-8 text-xl md:text-2xl text-foreground/80 max-w-2xl mx-auto text-balance">
          An AI-powered learning platform connecting language and culture through modern technology
        </p>
        
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link 
            to="/dictionary" 
            className="animate-scale-in inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-xl shadow-subtle font-medium transition-all duration-300 hover:shadow-hover hover:scale-[1.02]"
          >
            Start Learning
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
          
          <Link 
            to="/about" 
            className="animate-scale-in inline-flex items-center px-6 py-3 bg-accent text-accent-foreground rounded-xl font-medium transition-all duration-300 hover:bg-accent/70"
          >
            Learn More
          </Link>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-24">
        <h2 className="text-3xl font-semibold text-center mb-16">Explore Our Features</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <Link 
              to={feature.link}
              key={feature.id}
              className="feature-card group"
              style={{ 
                animationDelay: `${(index + 1) * 100}ms`,
                animationFillMode: 'forwards'
              }}
            >
              <div className="bg-white h-full rounded-2xl p-6 border border-border shadow-subtle transition-all duration-300 group-hover:shadow-hover group-hover:border-primary/20 group-hover:translate-y-[-4px]">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-medium mb-2 text-foreground">{feature.title}</h3>
                <p className="text-foreground/70 mb-4">{feature.desc}</p>
                <div className="flex items-center text-primary font-medium">
                  Explore
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
