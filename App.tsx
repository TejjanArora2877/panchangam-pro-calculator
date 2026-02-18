
import React, { useState, useEffect, useCallback } from 'react';
import { AstronomyData, PanchangResult, UserLocation, Language } from './types';
import { DEFAULT_LAT, DEFAULT_LON } from './constants';
import { fetchAstronomyData } from './services/astronomyService';
import { computeEclipticLongitudeFromAltAz } from './utils/astronomyUtils';
import { calculatePanchang } from './utils/panchangUtils';
import { UI_LABELS } from './utils/translations';

import Header from './components/Header';
import LocationSelector from './components/LocationSelector';
import DateTimeSelector from './components/DateSelector';
import PanchangResults from './components/PanchangResults';
import AstronomyTimings from './components/AstronomyTimings';

const App: React.FC = () => {
  // State
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState<string>(new Date().toTimeString().slice(0, 5));
  const [location, setLocation] = useState<UserLocation>({ 
    lat: DEFAULT_LAT, 
    lon: DEFAULT_LON, 
    city: '',
    status: 'Initializing...' 
  });
  const [moonLong, setMoonLong] = useState<string>('');
  const [sunLong, setSunLong] = useState<string>('');
  const [astronomy, setAstronomy] = useState<AstronomyData | null>(null);
  
  const [panchang, setPanchang] = useState<PanchangResult | null>(null);
  const [panchangEn, setPanchangEn] = useState<PanchangResult | null>(null);
  
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [view, setView] = useState<'calculator' | 'about'>('calculator');
  const [language, setLanguage] = useState<Language>('en');

  // Theme effect
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark', 'bg-slate-900');
    } else {
      document.body.classList.remove('dark', 'bg-slate-900');
    }
  }, [darkMode]);

  // Geolocation Init
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocation({
            lat: pos.coords.latitude,
            lon: pos.coords.longitude,
            city: 'Current Location',
            status: `Detected: ${pos.coords.latitude.toFixed(2)}, ${pos.coords.longitude.toFixed(2)}`
          });
        },
        () => {
          setLocation(prev => ({ ...prev, status: 'Access denied. Using default: India.' }));
        }
      );
    } else {
      setLocation(prev => ({ ...prev, status: 'Geolocation not supported. Using default: India.' }));
    }
  }, []);

  // Fetch Data Callback
  const handleFetchData = useCallback(async () => {
    if (!date) return;
    try {
      // Pass time to API to get accurate moon/sun position at that moment if supported, 
      // or at least get day data for rise/set times.
      const data = await fetchAstronomyData(location.lat, location.lon, date, time);
      setAstronomy(data);

      // Create a specific timestamp for calculation
      const timestamp = `${date}T${time}:00`;
      
      const mLong = computeEclipticLongitudeFromAltAz(
        parseFloat(data.moon_azimuth),
        parseFloat(data.moon_altitude),
        location.lat,
        location.lon,
        timestamp
      );
      const sLong = computeEclipticLongitudeFromAltAz(
        parseFloat(data.sun_azimuth),
        parseFloat(data.sun_altitude),
        location.lat,
        location.lon,
        timestamp
      );

      setMoonLong(mLong.toFixed(4));
      setSunLong(sLong.toFixed(4));
    } catch (err) {
      console.error(err);
      setLocation(prev => ({ ...prev, status: 'Error fetching astronomy data.' }));
    }
  }, [date, time, location.lat, location.lon]);

  // Trigger fetch on date, time or location change
  // Debounce could be added here if time changes rapidly, but standard useEffect is fine for now
  useEffect(() => {
    handleFetchData();
  }, [handleFetchData]);

  // Calculation effect
  useEffect(() => {
    const m = parseFloat(moonLong);
    const s = parseFloat(sunLong);
    if (!isNaN(m) && !isNaN(s)) {
      // Calculate active language version
      const res = calculatePanchang(m, s, date, time, astronomy, language);
      setPanchang(res);

      // Calculate English version for PDF backup (fonts issue with non-latin)
      if (language !== 'en') {
        const resEn = calculatePanchang(m, s, date, time, astronomy, 'en');
        setPanchangEn(resEn);
      } else {
        setPanchangEn(res);
      }
    }
  }, [moonLong, sunLong, date, time, astronomy, language]);

  const t = UI_LABELS[language];

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300">
      <Header 
        view={view} 
        setView={setView} 
        darkMode={darkMode} 
        setDarkMode={setDarkMode} 
        language={language}
        setLanguage={setLanguage}
      />

      <main className="flex-1 max-w-4xl mx-auto w-full p-4 sm:p-8">
        {view === 'calculator' ? (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            
            {/* Control Panel */}
            <div className="md:col-span-5 space-y-6">
              <section className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
                   <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/></svg>
                   {t.controls}
                </h2>
                
                <div className="space-y-6">
                  <DateTimeSelector 
                    date={date} 
                    setDate={setDate} 
                    time={time}
                    setTime={setTime}
                  />
                  <LocationSelector location={location} setLocation={setLocation} />
                  
                  <button 
                    onClick={handleFetchData}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-500/20 transition-all active:scale-95"
                  >
                    {t.update}
                  </button>
                </div>
              </section>

              <section className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.673.337a4 4 0 01-1.909.498H8a4 4 0 01-4-4V5a2 2 0 012-2h6a2 2 0 012 2v2a2 2 0 01-2 2H8m13 13v-2a2 2 0 00-2-2h-2a2 2 0 00-2 2v2"/></svg>
                  {t.coordinates} (°)
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Moon Longitude</label>
                    <input 
                      type="number" 
                      value={moonLong} 
                      step="0.0001"
                      onChange={(e) => setMoonLong(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Sun Longitude</label>
                    <input 
                      type="number" 
                      value={sunLong} 
                      step="0.0001"
                      onChange={(e) => setSunLong(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
                    />
                  </div>
                </div>
              </section>
            </div>

            {/* Display Side */}
            <div className="md:col-span-7 space-y-4">
              <PanchangResults 
                panchang={panchang}
                panchangEn={panchangEn}
                location={location}
                date={date}
                astronomy={astronomy}
                language={language}
              />
              <AstronomyTimings astronomy={astronomy} />
            </div>
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 animate-in fade-in zoom-in duration-300">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">About Panchangam Pro</h2>
            <div className="space-y-4 text-slate-600 dark:text-slate-300 leading-relaxed">
              <p>
                Panchangam Pro is a Vedic calculator application built with React. 
                Our tool calculates essential Panchang elements-Tithi, Nakshatra, Yoga, and Vara-using exact ecliptic longitudes.
              </p>
              <p>
                The calculation engine incorporates atmospheric refraction corrections and precise Julian date conversions to ensure accuracy 
                down to the minute for your specific geographical coordinates.
              </p>
              <div className="pt-6 border-t border-slate-100 dark:border-slate-700">
                <p className="font-semibold text-slate-800 dark:text-slate-200">Engineering & Development:</p>
                <p>Tejjan Arora</p>
                <p className="text-sm opacity-75">Shah And Anchor Kutchhi Engineering College</p>
                <p className="font-semibold text-slate-800 dark:text-slate-200">Mentor:</p>
                <p>Sarika Rane</p>
                <p className="text-sm opacity-75">Shah And Anchor Kutchhi Engineering College</p>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-slate-50 dark:bg-slate-950 py-8 border-t border-slate-200 dark:border-slate-800 text-center mt-auto">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            © 2025 Panchangam Pro
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
