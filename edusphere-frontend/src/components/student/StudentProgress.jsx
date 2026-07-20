import React from 'react';

export default function StudentProgress({ enrollments, analytics, certificates }) {
  return (
    <div className="space-y-6 text-left">
      <h3 className="text-lg font-bold text-slate-800">My Learning Stats</h3>
      <div className="grid sm:grid-cols-2 gap-4">
        
        {/* Progress Average Circular Chart dial */}
        <div className="bg-slate-550 border border-slate-100 p-5 rounded-2xl text-center flex flex-col justify-center items-center space-y-2">
          <div className="h-20 w-20 rounded-full border-4 border-purple-500 bg-white flex items-center justify-center text-lg font-black text-purple-600">
            {enrollments.length > 0 ? Math.round(enrollments.reduce((acc, curr) => acc + curr.progressPercent, 0) / enrollments.length) : 0}%
          </div>
          <div className="text-xs font-bold text-slate-700">Average Course Progress</div>
        </div>

        {/* Info grids */}
        <div className="bg-slate-550 border border-slate-100 p-5 rounded-2xl grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <span className="text-[10px] text-slate-400 uppercase font-bold">XP Earned</span>
            <div className="text-base font-extrabold text-slate-800">{analytics.xp} XP</div>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] text-slate-400 uppercase font-bold">Certificates</span>
            <div className="text-base font-extrabold text-slate-800">{certificates.length}</div>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] text-slate-400 uppercase font-bold">Completions</span>
            <div className="text-base font-extrabold text-slate-800">{enrollments.filter(e => e.status === 'completed').length}</div>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] text-slate-400 uppercase font-bold">Enrolled Paths</span>
            <div className="text-base font-extrabold text-slate-800">{enrollments.length}</div>
          </div>
        </div>

      </div>
    </div>
  );
}
