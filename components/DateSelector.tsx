
import React from 'react';

interface DateTimeSelectorProps {
  date: string;
  setDate: (date: string) => void;
  time: string;
  setTime: (time: string) => void;
}

const DateTimeSelector: React.FC<DateTimeSelectorProps> = ({ date, setDate, time, setTime }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Date</label>
        <input 
          type="date" 
          value={date} 
          onChange={(e) => setDate(e.target.value)}
          className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 transition-all outline-none"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Time</label>
        <input 
          type="time" 
          value={time} 
          onChange={(e) => setTime(e.target.value)}
          className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 transition-all outline-none"
        />
      </div>
    </div>
  );
};

export default DateTimeSelector;
