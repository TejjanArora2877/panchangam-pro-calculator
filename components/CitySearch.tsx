
import React, { useState, useEffect, useRef } from 'react';

interface CitySearchProps {
  onSelect: (lat: number, lon: number, name: string) => void;
}

interface CityResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  admin1?: string;
}

const CitySearch: React.FC<CitySearchProps> = ({ onSelect }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<CityResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const searchCities = async () => {
      if (query.length < 3) {
        setResults([]);
        return;
      }
      setLoading(true);
      try {
        const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5&language=en&format=json`);
        const data = await response.json();
        setResults(data.results || []);
        setIsOpen(true);
      } catch (error) {
        console.error("City search failed", error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(searchCities, 500);
    return () => clearTimeout(timeoutId);
  }, [query]);

  return (
    <div className="relative" ref={wrapperRef}>
      <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Search City</label>
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type city name (e.g., Mumbai, New York)"
          className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl pl-10 pr-4 py-2 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 transition-all outline-none"
          onFocus={() => { if(results.length > 0) setIsOpen(true); }}
        />
        <svg className="w-5 h-5 text-slate-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        {loading && (
          <div className="absolute right-3 top-3 w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        )}
      </div>

      {isOpen && results.length > 0 && (
        <ul className="absolute z-50 w-full mt-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg max-h-60 overflow-y-auto">
          {results.map((city) => (
            <li 
              key={city.id}
              onClick={() => {
                onSelect(city.latitude, city.longitude, city.name);
                setQuery(city.name);
                setIsOpen(false);
              }}
              className="px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer border-b border-slate-100 dark:border-slate-700 last:border-0"
            >
              <div className="font-medium text-slate-800 dark:text-slate-200">{city.name}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                {[city.admin1, city.country].filter(Boolean).join(', ')}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CitySearch;
