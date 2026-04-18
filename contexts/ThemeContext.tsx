
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type ThemeType = 'romantic' | 'dark' | 'pastel' | 'minimal';

interface ThemeContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeType>(() => {
    const saved = localStorage.getItem('lovia_theme');
    return (saved as ThemeType) || 'romantic';
  });

  useEffect(() => {
    const root = document.documentElement;
    // Remove all theme classes
    root.classList.remove('theme-romantic', 'theme-dark', 'theme-pastel', 'theme-minimal');
    // Add current theme class
    if (theme !== 'romantic') {
      root.classList.add(`theme-${theme}`);
    }
    localStorage.setItem('lovia_theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
