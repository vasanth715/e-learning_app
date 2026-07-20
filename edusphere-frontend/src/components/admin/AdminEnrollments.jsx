import React from 'react';

export default function AdminEnrollments({ enrollments }) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-slate-800 text-left">Student Enrollments Log</h3>
      {enrollments.length === 0 ? (
        <p className="text-xs text-slate-400 text-left">No enrollments recorded.</p>
      ) : (
        <div className="border border-slate-200/60 rounded-2xl overflow-hidden shadow-sm bg-white">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] border-b border-slate-100">
              <tr>
                <th className="p-4">Enroll ID</th>
                <th className="p-4">Course ID</th>
                <th className="p-4">Progress</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {enrollments.map(e => (
                <tr key={e.id} className="hover:bg-slate-50/50 transition">
                  <td className="p-4 font-mono text-slate-500">#{e.id}</td>
                  <td className="p-4 font-bold">Course #{e.courseId}</td>
                  <td className="p-4 font-bold text-slate-800">{e.progressPercent}%</td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      e.status === 'completed'
                        ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                        : 'bg-purple-50 text-purple-600 border border-purple-100'
                    }`}>
                      {e.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
