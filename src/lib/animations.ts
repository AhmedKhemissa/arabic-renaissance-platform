
import { useEffect } from 'react';

// Animation utility for staggered entrance animations
export const staggeredAnimation = (
  selector: string, 
  delay: number = 100, 
  initialDelay: number = 0
) => {
  useEffect(() => {
    const elements = document.querySelectorAll(selector);
    
    elements.forEach((el, index) => {
      const htmlEl = el as HTMLElement;
      
      // Initial state - hidden
      htmlEl.style.opacity = '0';
      htmlEl.style.transform = 'translateY(10px)';
      htmlEl.style.transition = 'opacity 600ms ease, transform 600ms ease';
      
      // Animate in after delay
      setTimeout(() => {
        htmlEl.style.opacity = '1';
        htmlEl.style.transform = 'translateY(0)';
      }, initialDelay + (index * delay));
    });
    
    return () => {
      // Cleanup
      elements.forEach((el) => {
        const htmlEl = el as HTMLElement;
        htmlEl.style.opacity = '';
        htmlEl.style.transform = '';
        htmlEl.style.transition = '';
      });
    };
  }, [selector, delay, initialDelay]);
};

// Transition options for page changes
export const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5
};

export const pageVariants = {
  initial: {
    opacity: 0,
    y: 8,
  },
  in: {
    opacity: 1,
    y: 0,
  },
  out: {
    opacity: 0,
    y: -8,
  },
};
