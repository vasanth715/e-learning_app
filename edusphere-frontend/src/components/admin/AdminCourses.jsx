import React from 'react';

export default function AdminCourses({ courses, handleApprove }) {
  const pending = courses.filter(c => c.status === 'pending_review');

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-slate-800 text-left">Pending Review Submissions</h3>
      {pending.length === 0 ? (
        <p className="text-xs text-slate-400 italic text-left">No courses currently awaiting review approvals.</p>
      ) : (
        <div className="grid gap-3">
          {pending.map(c => (
            <div key={c.id} className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex items-center justify-between gap-4 text-left">
              <div>
                <h4 className="font-bold text-xs text-slate-800">{c.title}</h4>
                <p className="text-[10px] text-slate-400 mt-1">Author: {c.instructor?.name || 'Instructor'}</p>
              </div>
              <button
                onClick={() => handleApprove(c.id)}
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-black rounded-xl hover:scale-105 active:scale-95 transition shadow-md"
              >
                Approve & Publish
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
