
import React from 'react';
import { AstronomyData } from '../types';
import { CollapsibleCard } from './CollapsibleCard';

interface AstronomyTimingsProps {
  astronomy: AstronomyData | null;
}

const ResultRow = ({ label, value }: { label: string; value: string | number }) => (
  <div className="flex justify-between py-2 border-b border-slate-50 dark:border-slate-700 last:border-0">
    <span className="text-slate-500 dark:text-slate-400 text-sm">{label}</span>
    <span className="font-medium text-slate-800 dark:text-slate-200 text-right">{value}</span>
  </div>
);

const AstronomyTimings: React.FC<AstronomyTimingsProps> = ({ astronomy }) => {
  return (
    <CollapsibleCard title="Astronomical Timings" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>}>
      {astronomy ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
          <ResultRow label="Sunrise" value={astronomy.sunrise} />
          <ResultRow label="Sunset" value={astronomy.sunset} />
          <ResultRow label="Moonrise" value={astronomy.moonrise} />
          <ResultRow label="Moonset" value={astronomy.moonset} />
        </div>
      ) : (
        <p className="text-slate-400 text-sm">Update data to see timings.</p>
      )}
    </CollapsibleCard>
  );
};

export default AstronomyTimings;
