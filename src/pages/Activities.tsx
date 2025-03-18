
import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Activities = () => {
  useEffect(() => {
    // Apply animations to elements with class 'activity-card'
    const activityCards = document.querySelectorAll('.activity-card');
    activityCards.forEach((card, index) => {
      const element = card as HTMLElement;
      element.style.opacity = '0';
      element.style.transform = 'translateY(20px)';
      element.style.transition = 'opacity 0.4s ease-out, transform 0.4s ease-out';
      
      setTimeout(() => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }, 300 + (index * 100));
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-semibold mb-4">Arabic Learning Activities</h1>
              <p className="text-lg text-muted-foreground">
                Enhance your Arabic language skills with our interactive activities
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              {/* Activity Cards */}
              <div className="activity-card bg-card border rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
                <h3 className="text-xl font-medium mb-2">Vocabulary Practice</h3>
                <p className="text-muted-foreground mb-4">Master essential Arabic vocabulary through interactive exercises</p>
                <button className="text-primary hover:underline">Start Activity</button>
              </div>
              
              <div className="activity-card bg-card border rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
                <h3 className="text-xl font-medium mb-2">Grammar Exercises</h3>
                <p className="text-muted-foreground mb-4">Strengthen your understanding of Arabic grammar rules</p>
                <button className="text-primary hover:underline">Start Activity</button>
              </div>
              
              <div className="activity-card bg-card border rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
                <h3 className="text-xl font-medium mb-2">Reading Comprehension</h3>
                <p className="text-muted-foreground mb-4">Improve your reading skills with short Arabic texts</p>
                <button className="text-primary hover:underline">Start Activity</button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Activities;
