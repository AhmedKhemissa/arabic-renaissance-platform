
import React, { useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Toggle } from "@/components/ui/toggle";
import { useTheme } from '@/hooks/useTheme';

const DarkModeToggle: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  // Apply theme class to html element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <Toggle 
      pressed={isDarkMode}
      onPressedChange={toggleTheme}
      aria-label="Toggle dark mode"
      className="fixed top-4 right-14 z-50 p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors dark:bg-primary/20 dark:hover:bg-primary/30"
    >
      {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Toggle>
  );
};

export default DarkModeToggle;
