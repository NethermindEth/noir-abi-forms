import React, { createContext, useContext } from 'react';
import { Theme, defaultTheme } from '../styles/theme';

const ThemeContext = createContext<Theme>(defaultTheme);

export interface ThemeProviderProps {
  theme?: Partial<Theme>;
  children: React.ReactNode;
}

export function ThemeProvider({ theme = defaultTheme, children }: ThemeProviderProps) {
  return (
    <ThemeContext.Provider value={{ ...defaultTheme, ...theme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

// Helper function to combine class names with theme styles
export function getStyles(themeClasses: string[], additionalClasses?: string) {
  return [
    ...themeClasses,
    additionalClasses,
  ].filter(Boolean).join(' ');
} 