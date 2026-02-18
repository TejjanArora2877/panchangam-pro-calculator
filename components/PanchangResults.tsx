
import React from 'react';
import { PanchangResult, RashiInfo, UserLocation, AstronomyData, Language } from '../types';
import { CollapsibleCard } from './CollapsibleCard';
import { generatePDF } from '../utils/pdfGenerator';
import { UI_LABELS } from '../utils/translations';

interface PanchangResultsProps {
  panchang: PanchangResult | null;
  panchangEn: PanchangResult | null;
  location: UserLocation;
  date: string;
  astronomy: AstronomyData | null;
  language: Language;
}

const ResultRow = ({ label, value, highlight = false }: { label: string; value: string | number; highlight?: boolean }) => (
  <div className="flex justify-between py-2 border-b border-slate-50 dark:border-slate-700 last:border-0">
    <span className="text-slate-500 dark:text-slate-400 text-sm">{label}</span>
    <span className={`font-medium text-right ${highlight ? 'text-blue-600 dark:text-blue-400' : 'text-slate-800 dark:text-slate-200'}`}>{value}</span>
  </div>
);

const RashiDetail = ({ title, info, t }: { title: string; info: RashiInfo; t: Record<string, string> }) => (
  <div className="bg-slate-50 dark:bg-slate-900/50 p-3 rounded-lg border border-slate-100 dark:border-slate-700/50">
    <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">{title}</div>
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span className="text-slate-500">{t.sign}</span>
        <span className="font-bold text-slate-800 dark:text-slate-200">{info.name}</span>
      </div>
      <div className="flex justify-between text-xs">
        <span className="text-slate-400">{t.lord}</span>
        <span className="text-slate-600 dark:text-slate-300">{info.lord}</span>
      </div>
      <div className="flex justify-between text-xs">
        <span className="text-slate-400">{t.element}</span>
        <span className="text-slate-600 dark:text-slate-300">{info.element}</span>
      </div>
      <div className="flex justify-between text-xs">
        <span className="text-slate-400">{t.modality}</span>
        <span className="text-slate-600 dark:text-slate-300">{info.modality}</span>
      </div>
    </div>
  </div>
);

const PanchangResults: React.FC<PanchangResultsProps> = ({ panchang, panchangEn, location, date, astronomy, language }) => {
  const t = UI_LABELS[language];

  if (!panchang) {
    return <div className="p-4 text-center text-slate-400 italic">No calculation data available.</div>;
  }

  // Use panchangEn for PDF if available to ensure correct font rendering, otherwise fallback to current
  const pdfData = panchangEn || panchang;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-2">
         <h3 className="text-sm font-bold uppercase text-slate-400 tracking-wider">{t.analysis}</h3>
         <button 
           onClick={() => generatePDF(pdfData, location, date, astronomy)}
           className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm"
         >
           <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
           {t.downloadPdf}
         </button>
      </div>

      <CollapsibleCard title={t.currentPanchang} defaultOpen icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 5a7 7 0 100 14 7 7 0 000-14z"/></svg>}>
        <ResultRow label={t.tithi} value={panchang.tithi} highlight />
        <ResultRow label={t.endsAt} value={panchang.tithiEndTime} />
        <ResultRow label={t.nakshatra} value={`${panchang.nakshatra} (Pada ${panchang.pada})`} highlight />
        <ResultRow label={t.endsAt} value={panchang.nakshatraEndTime} />
        <ResultRow label={t.karana} value={panchang.karana} />
        <ResultRow label={t.yoga} value={panchang.yoga} />
        <div className="h-px bg-slate-100 dark:bg-slate-700 my-2"></div>
        <ResultRow label={t.paksha} value={panchang.paksha} />
        <ResultRow label={t.moonPhase} value={panchang.moonPhase} />
        <ResultRow label={t.vara} value={panchang.vara} />
      </CollapsibleCard>
      
      <CollapsibleCard title={t.planetaryPositions} defaultOpen icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <RashiDetail title={t.moonSign} info={panchang.moonRashi} t={t} />
          <RashiDetail title={t.sunSign} info={panchang.sunRashi} t={t} />
        </div>
      </CollapsibleCard>

      <CollapsibleCard title={t.tidesMarine} icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}>
        <div className="space-y-1">
          <div className="flex justify-between py-2 border-b border-slate-50 dark:border-slate-700">
             <span className="text-slate-500 dark:text-slate-400 text-sm">{t.condition}</span>
             <span className={`font-bold text-right ${panchang.tideIntensity.includes('Spring') ? 'text-blue-600' : 'text-slate-600 dark:text-slate-300'}`}>
               {panchang.tideIntensity}
             </span>
          </div>
          <ResultRow label={t.highTide} value={panchang.nextHighTide} />
          <ResultRow label={t.lowTide} value={panchang.nextLowTide} />
          <p className="mt-3 text-[10px] text-slate-400 italic leading-tight">
            {t.note}: {t.noteText}
          </p>
        </div>
      </CollapsibleCard>
    </div>
  );
};

export default PanchangResults;
