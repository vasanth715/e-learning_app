import React from 'react';
import { Shield } from 'lucide-react';

export default function OrgHome({ org }) {
  const percent = Math.round((org.seatOccupied / org.seatCount) * 100);

  return (
    <div className="space-y-6">
      
      {/* Overview stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm text-left space-y-1">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Total Corporate Licenses</span>
          <div className="text-2xl font-black text-slate-800">{org.seatCount} Seat Slots</div>
          <p className="text-[9px] text-slate-400 mt-1">Acquired under enterprise subscription</p>
        </div>
        
        <div className="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm text-left space-y-1">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Occupied License Slots</span>
          <div className="text-2xl font-black text-purple-600">{org.seatOccupied} / {org.seatCount} Active</div>
          <p className="text-[9px] text-slate-400 mt-1">{org.seatCount - org.seatOccupied} unused seats available</p>
        </div>
      </div>

      {/* Seat progress bar */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm space-y-3 text-left">
        <div className="flex justify-between items-center text-xs font-bold text-slate-600">
          <span>License Consumption Rate</span>
          <span className="bg-purple-50 text-purple-700 font-black px-2 py-0.5 rounded text-[10px]">{percent}% Allocated</span>
        </div>
        <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden border border-slate-200/20">
          <div className="bg-purple-600 h-full transition-all duration-300" style={{ width: `${percent}%` }}></div>
        </div>
        <p className="text-[10px] text-slate-400 leading-relaxed">
          Need more seats? Contact our enterprise support center at <span className="font-semibold text-slate-600">billing@gopiverse.com</span> to expand your subscription limit.
        </p>
      </div>

    </div>
  );
}
