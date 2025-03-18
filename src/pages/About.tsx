
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Separator } from '@/components/ui/separator';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-semibold mb-4">About Us</h1>
              <p className="text-lg text-muted-foreground">
                Learn more about our mission to promote Arabic language learning
              </p>
            </div>
            
            <div className="bg-card border rounded-xl p-8 shadow-sm">
              <h2 className="text-2xl font-medium mb-4">Our Mission</h2>
              <p className="mb-6">
                At Arabic Renaissance, we are dedicated to making Arabic language learning 
                accessible, engaging, and effective for learners around the world. We combine 
                traditional teaching methods with modern technology to create a comprehensive 
                learning experience.
              </p>
              
              <Separator className="my-6" />
              
              <h2 className="text-2xl font-medium mb-4">Our Approach</h2>
              <p className="mb-6">
                We believe that language learning should be immersive, practical, and culturally 
                relevant. Our platform offers a variety of tools and resources designed to help 
                you develop all aspects of language proficiency - reading, writing, listening, 
                and speaking.
              </p>
              
              <Separator className="my-6" />
              
              <h2 className="text-2xl font-medium mb-4">Our Team</h2>
              <p className="mb-6">
                Our team consists of experienced Arabic language teachers, curriculum developers, 
                and technology experts who are passionate about creating the best Arabic learning 
                platform. With decades of combined experience in language education, we understand 
                what it takes to help students achieve fluency.
              </p>
              
              <div className="mt-8 text-center">
                <p className="text-sm text-muted-foreground">
                  Have questions or feedback? Contact us at <a href="mailto:contact@arabicrenaissance.com" className="text-primary hover:underline">contact@arabicrenaissance.com</a>
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

export default About;
