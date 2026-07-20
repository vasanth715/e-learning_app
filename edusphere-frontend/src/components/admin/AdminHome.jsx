import React from 'react';

export default function AdminHome({ courses, enrollments }) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-bold text-slate-800">Admin Dashboard Overview</h3>
      
      {/* Stats widgets */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/60 shadow-sm text-left">
          <span className="text-[10px] text-slate-400 font-bold uppercase">Total Students</span>
          <div className="text-xl font-black text-slate-800 mt-1">2,453</div>
          <div className="text-[9px] text-emerald-500 font-bold mt-1">▲ 15.7% Growth</div>
        </div>
        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/60 shadow-sm text-left">
          <span className="text-[10px] text-slate-400 font-bold uppercase">Total Courses</span>
          <div className="text-xl font-black text-slate-800 mt-1">{courses.length}</div>
          <div className="text-[9px] text-emerald-500 font-bold mt-1">▲ 8.3% Uploads</div>
        </div>
        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/60 shadow-sm text-left">
          <span className="text-[10px] text-slate-400 font-bold uppercase">Enrollments</span>
          <div className="text-xl font-black text-slate-800 mt-1">{enrollments.length + 120}</div>
          <div className="text-[9px] text-emerald-500 font-bold mt-1">▲ 12.5% Month</div>
        </div>
        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/60 shadow-sm text-left">
          <span className="text-[10px] text-slate-400 font-bold uppercase">Total Revenue</span>
          <div className="text-xl font-black text-slate-800 mt-1">$245,750</div>
          <div className="text-[9px] text-emerald-500 font-bold mt-1">▲ 18.6% Growth</div>
        </div>
      </div>

      {/* Simulated Chart card */}
      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/60 shadow-sm space-y-4 text-left">
        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">Monthly Revenue Flow Chart</h4>
        <div className="h-32 bg-white rounded-xl border border-slate-200 flex items-end justify-between p-4 gap-2">
          {[40, 60, 45, 90, 75, 110, 130].map((val, idx) => (
            <div key={idx} className="flex-1 bg-purple-500 hover:bg-purple-600 rounded-t-lg transition-all" style={{ height: `${val}%` }}></div>
          ))}
        </div>
      </div>
    </div>
  );
}
