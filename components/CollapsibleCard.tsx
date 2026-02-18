
import React, { useState } from 'react';

interface CollapsibleCardProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  icon?: React.ReactNode;
}

export const CollapsibleCard: React.FC<CollapsibleCardProps> = ({ 
  title, 
  children, 
  defaultOpen = false,
  icon 
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm overflow-hidden transition-all duration-200 mb-4">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
      >
        <div className="flex items-center gap-3">
          {icon && <span className="text-blue-500">{icon}</span>}
          <h3 className="font-semibold text-slate-800 dark:text-slate-100">{title}</h3>
        </div>
        <svg 
          className={`w-5 h-5 text-slate-400 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="p-4 pt-0 animate-in fade-in slide-in-from-top-1 duration-200">
          <div className="border-t border-slate-100 dark:border-slate-700 pt-4">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};
