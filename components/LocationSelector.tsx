
import React from 'react';
import { UserLocation } from '../types';
import CitySearch from './CitySearch';

interface LocationSelectorProps {
  location: UserLocation;
  setLocation: React.Dispatch<React.SetStateAction<UserLocation>>;
}

const LocationSelector: React.FC<LocationSelectorProps> = ({ location, setLocation }) => {
  const handleCitySelect = (lat: number, lon: number, name: string) => {
    setLocation({
      lat,
      lon,
      city: name,
      status: `Selected: ${name}`
    });
  };

  return (
    <div className="space-y-4">
      <CitySearch onSelect={handleCitySelect} />
      
      <div className="flex items-center gap-2">
        <div className="h-px bg-slate-200 dark:bg-slate-700 flex-1"></div>
        <span className="text-xs text-slate-400 font-medium uppercase">Or Manual Coordinates</span>
        <div className="h-px bg-slate-200 dark:bg-slate-700 flex-1"></div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Latitude</label>
          <input 
            type="number" 
            value={location.lat} 
            onChange={(e) => setLocation(prev => ({...prev, lat: parseFloat(e.target.value) || 0, status: 'Manual Input'}))}
            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 transition-all outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Longitude</label>
          <input 
            type="number" 
            value={location.lon} 
            onChange={(e) => setLocation(prev => ({...prev, lon: parseFloat(e.target.value) || 0, status: 'Manual Input'}))}
            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 transition-all outline-none"
          />
        </div>
      </div>
      <div className="flex justify-between items-center text-xs">
         <p className="text-slate-400 italic truncate max-w-[70%]">{location.status}</p>
         {location.city && <span className="font-semibold text-blue-600 dark:text-blue-400">{location.city}</span>}
      </div>
    </div>
  );
};

export default LocationSelector;
