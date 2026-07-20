import React from 'react';
import { Trash2, Shield, User } from 'lucide-react';

export default function OrgMembers({ members, onRevoke }) {
  return (
    <div className="space-y-4">
      <div className="bg-white p-5 rounded-3xl border border-slate-200/60 shadow-sm text-left">
        <h3 className="font-extrabold text-slate-800 text-xs tracking-wide uppercase">Seat Allocations directory</h3>
        <p className="text-[10px] text-slate-400 mt-0.5">Below are the current team employees occupying your corporate library license seats.</p>
      </div>

      <div className="border border-slate-200/60 rounded-3xl overflow-hidden shadow-sm bg-white text-left">
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] border-b border-slate-100">
            <tr>
              <th className="p-4">Employee</th>
              <th className="p-4">Email</th>
              <th className="p-4">Library Role</th>
              <th className="p-4 text-right">Revoke License</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {members.map(m => (
              <tr key={m.id} className="hover:bg-slate-50/50 transition">
                <td className="p-4">
                  <div className="flex items-center gap-2.5">
                    <div className="h-7 w-7 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center font-black">
                      {m.name[0]}
                    </div>
                    <span className="font-bold text-slate-800">{m.name}</span>
                  </div>
                </td>
                <td className="p-4 text-slate-500 font-medium">{m.email}</td>
                <td className="p-4">
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider border ${
                    m.isOwner 
                      ? 'bg-purple-50 text-purple-700 border-purple-200' 
                      : 'bg-blue-50 text-blue-700 border-blue-200'
                  }`}>
                    {m.isOwner ? 'Owner' : 'License Occupant'}
                  </span>
                </td>
                <td className="p-4 text-right">
                  {!m.isOwner ? (
                    <button
                      onClick={() => onRevoke(m.id)}
                      className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg hover:bg-slate-50 transition"
                      title="Revoke library access slot"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  ) : (
                    <span className="text-[10px] text-slate-300 italic">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
