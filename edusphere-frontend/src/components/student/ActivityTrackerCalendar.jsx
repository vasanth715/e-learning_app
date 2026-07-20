import React from 'react';

export default function ActivityTrackerCalendar() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const monthName = today.toLocaleString('default', { month: 'long' });

  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();

  const activeDays = [today.getDate(), today.getDate() - 1, today.getDate() - 2];
  const missedDays = [today.getDate() - 4];

  const blanks = Array(firstDay).fill(null);
  const days = Array.from({ length: totalDays }, (_, i) => i + 1);
  const grid = [...blanks, ...days];

  const weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  return (
    <div className="bg-slate-50 p-3 sm:p-4 rounded-2xl border border-slate-200/80 w-full max-w-[280px] mx-auto md:mx-0 md:w-64 shrink-0 text-slate-800 self-stretch flex flex-col justify-between shadow-sm">
      <div className="flex justify-between items-center mb-2 border-b border-slate-200/60 pb-1.5">
        <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">{monthName} {year}</span>
        <span className="text-[8px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded font-black uppercase tracking-wide">Activity Tracker</span>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center">
        {weekdays.map(w => (
          <span key={w} className="text-[8px] font-bold text-slate-400">{w}</span>
        ))}
        {grid.map((day, idx) => {
          if (day === null) {
            return <div key={`blank-${idx}`} className="h-5 w-5"></div>;
          }

          const isActive = activeDays.includes(day);
          const isMissed = missedDays.includes(day);

          let bgStyle = 'bg-white border border-slate-100 text-slate-600';
          if (isActive) {
            bgStyle = 'bg-emerald-500 border border-emerald-500 text-white font-extrabold shadow-sm shadow-emerald-500/20';
          } else if (isMissed) {
            bgStyle = 'bg-rose-500 border border-rose-500 text-white font-extrabold shadow-sm shadow-rose-500/20';
          }

          return (
            <div
              key={`day-${day}`}
              className={`h-5 w-5 rounded-md text-[8px] flex items-center justify-center transition-all ${bgStyle}`}
              title={isActive ? 'Active Study Day' : isMissed ? 'Missed Study Day' : 'No Activity'}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
}
