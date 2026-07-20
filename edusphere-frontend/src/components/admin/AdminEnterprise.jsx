import React, { useState } from 'react';
import { Building2, UserPlus, Users, Shield, CheckCircle2, Trash2, Send, Plus } from 'lucide-react';

export default function AdminEnterprise() {
  const [org, setOrg] = useState({ 
    name: 'Gopiverse Enterprise Corporate', 
    domainName: 'gopiverse.com', 
    seatCount: 25, 
    seatOccupied: 6 
  });
  
  const [inviteEmail, setInviteEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [newSeatInput, setNewSeatInput] = useState('');

  const [members, setMembers] = useState([
    { id: 1, name: "System Administrator", email: "admin@edusphere.com", role: "Super Admin", isOwner: true },
    { id: 2, name: "Diya Khere", email: "diya@example.com", role: "Enterprise Learner" },
    { id: 3, name: "Rahul Sharma", email: "rahul@example.com", role: "Enterprise Learner" },
    { id: 4, name: "Sneha Patil", email: "sneha@example.com", role: "Enterprise Learner" },
    { id: 5, name: "Instructor Alex", email: "instructor@edusphere.com", role: "Lead Instructor" },
    { id: 6, name: "Mark Corporate Lead", email: "orgadmin@edusphere.com", role: "Enterprise Lead" }
  ]);

  const handleInvite = (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (org.seatOccupied >= org.seatCount) {
      setError('Corporate seats limit reached! Expand license slot capacity below.');
      return;
    }

    if (members.some(m => m.email.toLowerCase() === inviteEmail.toLowerCase())) {
      setError('This user email already occupies an active seat slot.');
      return;
    }

    const emailName = inviteEmail.split('@')[0];
    const formattedName = emailName.charAt(0).toUpperCase() + emailName.slice(1);
    
    setMembers(prev => [...prev, { id: Date.now(), name: formattedName, email: inviteEmail, role: 'Enterprise Learner' }]);
    setOrg(prev => ({ ...prev, seatOccupied: prev.seatOccupied + 1 }));
    setMessage(`Seat successfully allocated and license invitation sent to ${inviteEmail}!`);
    setInviteEmail('');
  };

  const handleRevoke = (id) => {
    if (confirm('Revoke this enterprise library seat license?')) {
      setMembers(prev => prev.filter(m => m.id !== id));
      setOrg(prev => ({ ...prev, seatOccupied: Math.max(1, prev.seatOccupied - 1) }));
    }
  };

  const handleExpandSeats = (e) => {
    e.preventDefault();
    const count = parseInt(newSeatInput, 10);
    if (!count || count <= 0) return;
    setOrg(prev => ({ ...prev, seatCount: prev.seatCount + count }));
    setNewSeatInput('');
    alert(`Expanded enterprise license capacity by +${count} seats!`);
  };

  const percent = Math.round((org.seatOccupied / org.seatCount) * 100);

  return (
    <div className="space-y-6 text-left">
      
      {/* Header Banner */}
      <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 text-white flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-black uppercase tracking-widest border border-purple-500/30">
            <Building2 className="h-3 w-3" />
            <span>Super Admin Full Powers Control</span>
          </div>
          <h2 className="text-xl font-black text-white">Enterprise & Team Seat Licenses</h2>
          <p className="text-xs text-slate-400">Manage corporate accounts, seat allocations, and domain license limits.</p>
        </div>

        <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 text-center shrink-0">
          <span className="text-[10px] font-bold uppercase text-slate-300 block">Total Seat Capacity</span>
          <span className="text-xl font-black text-white">{org.seatOccupied} / {org.seatCount} Seats</span>
        </div>
      </div>

      {/* Metrics & Expand Capacity Row */}
      <div className="grid md:grid-cols-12 gap-6">
        
        {/* Usage Progress */}
        <div className="md:col-span-7 bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm space-y-4">
          <div className="flex justify-between items-center text-xs font-bold text-slate-700">
            <span>Corporate Seats Allocated</span>
            <span className="bg-purple-50 text-purple-700 font-black px-2.5 py-1 rounded-lg text-xs">{percent}% Allocated</span>
          </div>
          <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden border border-slate-200/40">
            <div className="bg-purple-600 h-full transition-all duration-300" style={{ width: `${percent}%` }}></div>
          </div>
          <div className="flex justify-between text-[11px] font-bold text-slate-400">
            <span>Occupied: {org.seatOccupied} Seats</span>
            <span>Available: {org.seatCount - org.seatOccupied} Slots</span>
          </div>
        </div>

        {/* Expand Seats Form */}
        <form onSubmit={handleExpandSeats} className="md:col-span-5 bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm space-y-3">
          <span className="text-xs font-black text-slate-800 uppercase tracking-wider block">Expand License Capacity</span>
          <div className="flex gap-2">
            <input 
              type="number"
              required
              min="1"
              placeholder="+10 Seats"
              value={newSeatInput}
              onChange={(e) => setNewSeatInput(e.target.value)}
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs font-bold text-slate-800 outline-none focus:border-purple-500"
            />
            <button 
              type="submit"
              className="px-4 py-2 bg-purple-600 text-white rounded-xl text-xs font-black hover:bg-purple-700 transition flex items-center gap-1 shrink-0 cursor-pointer"
            >
              <Plus className="h-4 w-4" /> Add Seats
            </button>
          </div>
        </form>
      </div>

      {/* Invite Member Box */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm space-y-4">
        <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
          <UserPlus className="h-4 w-4 text-purple-600" />
          <span>Allocate Corporate Seat & Send License Invite</span>
        </h3>

        {message && (
          <div className="p-3 bg-emerald-50 text-emerald-700 rounded-xl text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" /> {message}
          </div>
        )}
        {error && (
          <div className="p-3 bg-red-50 text-red-600 rounded-xl text-xs font-bold">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleInvite} className="flex flex-col sm:flex-row gap-3">
          <input 
            type="email"
            required
            placeholder="enter user email (e.g. employee@company.com)..."
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-medium text-slate-800 outline-none focus:border-purple-500"
          />
          <button 
            type="submit"
            className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-black rounded-xl text-xs shadow-md shadow-purple-600/10 hover:scale-105 transition flex items-center justify-center gap-2 shrink-0 cursor-pointer"
          >
            <Send className="h-3.5 w-3.5" /> Allocate & Invite
          </button>
        </form>
      </div>

      {/* Active Team Seats Directory */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm space-y-4">
        <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center justify-between">
          <span>Active Allocated Seats ({members.length})</span>
          <span className="text-[10px] text-slate-400 font-bold">Full Admin Revoke Access</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-400 text-[10px] font-extrabold uppercase border-b border-slate-100">
              <tr>
                <th className="p-3">User Name</th>
                <th className="p-3">Email Address</th>
                <th className="p-3">Assigned Role</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {members.map(m => (
                <tr key={m.id} className="hover:bg-slate-50/50 transition">
                  <td className="p-3 font-bold text-slate-900 flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-[10px]">
                      {m.name[0]}
                    </div>
                    <span>{m.name}</span>
                  </td>
                  <td className="p-3 text-slate-500">{m.email}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase bg-purple-50 text-purple-700 border border-purple-200/30">
                      {m.role || 'Learner'}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    {!m.isOwner && (
                      <button 
                        onClick={() => handleRevoke(m.id)}
                        className="text-slate-400 hover:text-red-600 p-1.5 hover:bg-red-50 rounded-lg transition"
                        title="Revoke Seat License"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
