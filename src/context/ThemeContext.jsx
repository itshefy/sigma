import React, { createContext, useContext, useEffect } from 'react';
import { useLocalStorage } from '../lib/hooks/useLocalStorage';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useLocalStorage('darkMode', false);

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    root.style.transition = 'background-color 0.3s ease, color 0.3s ease';
  }, [isDarkMode]);

  const value = {
    isDarkMode,
    toggleDarkMode: () => setIsDarkMode(prev => !prev)
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};