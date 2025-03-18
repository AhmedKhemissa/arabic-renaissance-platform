
import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import { staggeredAnimation } from '../lib/animations';

const Index = () => {
  // Apply staggered animation to feature cards on page load
  useEffect(() => {
    staggeredAnimation('.feature-card', 100, 300);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
