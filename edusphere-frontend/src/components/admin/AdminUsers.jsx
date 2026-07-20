import React, { useState } from 'react';
import { Users, Search, UserCheck, PauseCircle, Play, Trash2, ShieldAlert, CheckCircle2 } from 'lucide-react';

export default function AdminUsers({ users = [], onHoldUser, onDeleteUser }) {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');

  const filtered = users.filter(u => {
    const matchesSearch = u.name?.toLowerCase().includes(search.toLowerCase()) || 
                          u.email?.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === 'All' || u.role?.toLowerCase() === roleFilter.toLowerCase();
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6 text-left">
      
      {/* Header Banner */}
      <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 text-white flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-black uppercase tracking-widest border border-purple-500/30">
            <UserCheck className="h-3 w-3" />
            <span>Super Admin Full Powers</span>
          </div>
          <h2 className="text-xl font-black text-white">Platform Users Control & Moderation</h2>
          <p className="text-xs text-slate-400">Put accounts on hold (suspend access) or permanently delete users with instant database updates.</p>
        </div>

        <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 text-center shrink-0">
          <span className="text-[10px] font-bold uppercase text-slate-300 block">Total Accounts</span>
          <span className="text-xl font-black text-white">{users.length} Users</span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search user by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-800 outline-none focus:border-purple-500 transition font-medium"
          />
        </div>

        <div className="flex gap-2 w-full sm:w-auto">
          {['All', 'Student', 'Instructor', 'Admin'].map(r => (
            <button
              key={r}
              onClick={() => setRoleFilter(r)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                roleFilter === r
                  ? 'bg-purple-600 text-white shadow-md font-black'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="border border-slate-200/80 rounded-3xl overflow-hidden shadow-sm bg-white">
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-900 text-white font-extrabold uppercase text-[10px]">
            <tr>
              <th className="p-4">User Name</th>
              <th className="p-4">Email Address</th>
              <th className="p-4">Account Status</th>
              <th className="p-4">System Role</th>
              <th className="p-4 text-right">Super Admin Powers</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {filtered.map(u => {
              const isHeld = u.status === 'suspended' || u.isHold === true;
              return (
                <tr key={u.id} className="hover:bg-slate-50 transition">
                  <td className="p-4 font-black text-slate-900 flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-black text-xs shrink-0">
                      {u.name?.[0] || 'U'}
                    </div>
                    <span>{u.name}</span>
                  </td>
                  <td className="p-4 font-medium text-slate-500">{u.email}</td>
                  <td className="p-4">
                    {isHeld ? (
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-extrabold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                        <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                        🔴 Suspended / On Hold
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-extrabold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        🟢 Active
                      </span>
                    )}
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider ${
                      u.role === 'admin' 
                        ? 'bg-purple-100 text-purple-800 border border-purple-200'
                        : u.role === 'instructor'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-slate-100 text-slate-700 border border-slate-200'
                    }`}>
                      {u.role === 'admin' ? '🛡️ Super Admin' : u.role === 'instructor' ? '💼 Instructor' : '🎓 Student'}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onHoldUser && onHoldUser(u.id)}
                        className={`px-3 py-1.5 rounded-xl text-[10px] font-black transition flex items-center gap-1 border cursor-pointer ${
                          isHeld
                            ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border-emerald-200'
                            : 'bg-amber-50 hover:bg-amber-100 text-amber-700 border-amber-200'
                        }`}
                        title={isHeld ? "Un-hold / Activate user access" : "Put user account access on hold"}
                      >
                        {isHeld ? <Play className="h-3 w-3" /> : <PauseCircle className="h-3 w-3" />}
                        <span>{isHeld ? 'Un-Hold' : 'Hold Access'}</span>
                      </button>

                      <button
                        onClick={() => onDeleteUser && onDeleteUser(u.id)}
                        className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-xl text-[10px] font-black transition flex items-center gap-1 cursor-pointer"
                        title="Permanently delete user account"
                      >
                        <Trash2 className="h-3 w-3" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

    </div>
  );
}
