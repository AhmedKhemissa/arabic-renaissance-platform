
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-accent py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1 - About */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Arabic Renaissance</h3>
            <p className="text-foreground/70 mb-4">
              An innovative platform designed to make learning Arabic intuitive, engaging, and accessible through AI technology.
            </p>
          </div>
          
          {/* Column 2 - Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Features</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/dictionary" className="text-foreground/70 hover:text-primary transition-colors">
                  Dictionary
                </Link>
              </li>
              <li>
                <Link to="/image-generator" className="text-foreground/70 hover:text-primary transition-colors">
                  Image Generator
                </Link>
              </li>
              <li>
                <Link to="/speech-to-text" className="text-foreground/70 hover:text-primary transition-colors">
                  Speech to Text
                </Link>
              </li>
              <li>
                <Link to="/text-to-speech" className="text-foreground/70 hover:text-primary transition-colors">
                  Text to Speech
                </Link>
              </li>
              <li>
                <Link to="/activities" className="text-foreground/70 hover:text-primary transition-colors">
                  Learning Activities
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Column 3 - Navigation */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-foreground/70 hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-foreground/70 hover:text-primary transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/dictionary" className="text-foreground/70 hover:text-primary transition-colors">
                  Get Started
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border/40">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-foreground/60 text-sm order-2 md:order-1 mt-4 md:mt-0">
              © {currentYear} Arabic Renaissance. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 order-1 md:order-2">
              <Link to="/" className="text-foreground/60 hover:text-primary transition-colors text-sm">
                Privacy Policy
              </Link>
              <Link to="/" className="text-foreground/60 hover:text-primary transition-colors text-sm">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
