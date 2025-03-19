
import { useState, useEffect } from 'react';

export function useTheme() {
  // Check for user preference in localStorage, otherwise use system preference
  const getDefaultTheme = (): boolean => {
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme !== null) {
      return savedTheme === 'true';
    }
    // Check system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  };

  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Initialize theme on mount
  useEffect(() => {
    setIsDarkMode(getDefaultTheme());
  }, []);

  // Toggle theme function
  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem('darkMode', String(newTheme));
  };

  return { isDarkMode, toggleTheme };
}
