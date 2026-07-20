import React from 'react';
import { UserPlus, CheckCircle2 } from 'lucide-react';

export default function OrgInvite({
  inviteEmail, setInviteEmail, handleInvite, message, error
}) {
  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm space-y-4 text-left max-w-xl mx-auto">
      <h3 className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
        <UserPlus className="h-4 w-4 text-purple-600" /> Allocate Corporate Seat
      </h3>
      <p className="text-xs text-slate-400">
        Enter a team member's email below to invite them to join the corporate EduSphere learning paths catalog.
      </p>
      
      {message && (
        <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl text-xs font-semibold flex items-center gap-2 border border-emerald-100">
          <CheckCircle2 className="h-4 w-4" /> {message}
        </div>
      )}

      {error && (
        <div className="p-3 bg-red-50 text-red-600 rounded-xl text-xs font-semibold flex items-center gap-2 border border-red-100">
          <span>⚠</span> {error}
        </div>
      )}

      <form onSubmit={handleInvite} className="flex gap-2">
        <input
          type="email"
          required
          placeholder="engineer@company.com"
          value={inviteEmail}
          onChange={(e) => setInviteEmail(e.target.value)}
          className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-purple-500 transition font-medium"
        />
        <button
          type="submit"
          className="px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold hover:scale-105 active:scale-95 transition shadow-md shadow-purple-600/10"
        >
          Send Invite
        </button>
      </form>
    </div>
  );
}
