import React from 'react';

export default function AdminUsers({ users }) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-slate-800 text-left">Platform Users Ledger</h3>
      <div className="border border-slate-200/60 rounded-2xl overflow-hidden shadow-sm bg-white">
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] border-b border-slate-100">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">System Role</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {users.map(u => (
              <tr key={u.id} className="hover:bg-slate-50/50 transition">
                <td className="p-4 font-bold">{u.name}</td>
                <td className="p-4 text-slate-500">{u.email}</td>
                <td className="p-4">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                    u.role === 'admin' 
                      ? 'bg-red-50 text-red-600 border border-red-100'
                      : u.role === 'instructor'
                      ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                      : 'bg-purple-50 text-purple-600 border border-purple-100'
                  }`}>
                    {u.role}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
