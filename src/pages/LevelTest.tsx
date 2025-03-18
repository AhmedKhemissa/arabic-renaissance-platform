
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const LevelTest = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-semibold mb-4">Arabic Level Test</h1>
              <p className="text-lg text-muted-foreground">
                Discover your current Arabic proficiency level with our comprehensive assessment
              </p>
            </div>
            
            <div className="bg-card border rounded-xl p-8 shadow-sm">
              <h2 className="text-2xl font-medium mb-4">About the Test</h2>
              <p className="mb-6">
                Our Arabic level assessment will evaluate your skills in reading, writing, 
                vocabulary, and grammar. The test takes approximately 20-30 minutes to complete.
              </p>
              
              <Separator className="my-6" />
              
              <div className="space-y-4">
                <h3 className="text-xl font-medium">What to Expect:</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Multiple-choice questions</li>
                  <li>Short reading passages</li>
                  <li>Grammar exercises</li>
                  <li>Vocabulary assessment</li>
                </ul>
              </div>
              
              <div className="mt-8 text-center">
                <Button size="lg">
                  Start Assessment
                </Button>
                <p className="text-sm text-muted-foreground mt-4">
                  You'll receive your results immediately after completion
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LevelTest;
