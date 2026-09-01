'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeMode, ThemeConfig } from '../types/theme';
import { THEME_CONFIGS } from '../data/themeConfig';

interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (mode: ThemeMode) => void;
  config: ThemeConfig;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'cyberpunk',
  setTheme: () => {},
  config: THEME_CONFIGS.cyberpunk,
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>('cyberpunk');

  useEffect(() => {
    const saved = localStorage.getItem('raghav_portfolio_theme') as ThemeMode;
    if (saved && THEME_CONFIGS[saved]) {
      setThemeState(saved);
    }
  }, []);

  const setTheme = (mode: ThemeMode) => {
    setThemeState(mode);
    localStorage.setItem('raghav_portfolio_theme', mode);
  };

  const config = THEME_CONFIGS[theme] || THEME_CONFIGS.cyberpunk;

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--bg-dark', config.bgDark);
    root.style.setProperty('--bg-panel', config.bgPanel);
    root.style.setProperty('--bg-card', config.bgCard);
    root.style.setProperty('--accent-primary', config.accentPrimary);
    root.style.setProperty('--accent-secondary', config.accentSecondary);
    root.style.setProperty('--accent-glow', config.accentGlow);
    root.style.setProperty('--border-theme', config.borderTheme);
  }, [config]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, config }}>
      <div className={config.hasScanlines ? 'vhs-scanline' : ''}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
