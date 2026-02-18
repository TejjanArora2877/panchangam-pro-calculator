
import React from 'react';

interface ThemeToggleProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ darkMode, setDarkMode }) => {
  return (
    <button 
      onClick={() => setDarkMode(!darkMode)}
      className="p-2 rounded-lg bg-blue-700 dark:bg-blue-800 hover:bg-blue-500 transition-colors"
      aria-label="Toggle Theme"
    >
      {darkMode ? (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 5a7 7 0 100 14 7 7 0 000-14z"/>
        </svg>
      ) : (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
        </svg>
      )}
    </button>
  );
};

export default ThemeToggle;
