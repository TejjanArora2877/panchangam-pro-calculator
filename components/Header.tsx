
import React from 'react';
import ThemeToggle from './ThemeToggle';
import { Language } from '../types';

interface HeaderProps {
  view: 'calculator' | 'about';
  setView: (v: 'calculator' | 'about') => void;
  darkMode: boolean;
  setDarkMode: (v: boolean) => void;
  language: Language;
  setLanguage: (l: Language) => void;
}

const Header: React.FC<HeaderProps> = ({ view, setView, darkMode, setDarkMode, language, setLanguage }) => {
  return (
    <header className="sticky top-0 z-50 bg-blue-600 dark:bg-blue-900 text-white shadow-md">
      <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('calculator')}>
          <div className="bg-white/20 p-1.5 rounded-lg">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z"/></svg>
          </div>
          <h1 className="font-bold text-xl tracking-tight hidden sm:block uppercase">Panchangam Pro</h1>
          <h1 className="font-bold text-lg tracking-tight sm:hidden uppercase">Panchang</h1>
        </div>
        <div className="flex items-center gap-3">
          <select 
             value={language} 
             onChange={(e) => setLanguage(e.target.value as Language)}
             className="bg-blue-700 dark:bg-blue-800 text-white text-sm font-medium py-1.5 px-2 rounded-lg border-none outline-none cursor-pointer hover:bg-blue-500 transition-colors appearance-none"
             style={{textAlignLast: 'center'}}
          >
            <option value="en">English</option>
            <option value="hi">हिंदी</option>
            <option value="mr">मराठी</option>
          </select>
          <button 
            onClick={() => setView(view === 'calculator' ? 'about' : 'calculator')}
            className="hidden sm:block px-3 py-1.5 rounded-lg bg-blue-700 dark:bg-blue-800 text-sm font-medium hover:bg-blue-500 transition-colors"
          >
            {view === 'calculator' ? 'About Us' : 'Home'}
          </button>
          <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
        </div>
      </div>
    </header>
  );
};

export default Header;
