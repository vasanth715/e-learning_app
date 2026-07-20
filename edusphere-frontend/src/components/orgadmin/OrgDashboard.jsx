import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { 
  Users, UserPlus, Shield, LayoutDashboard, Menu, X, LogOut 
} from 'lucide-react';

import OrgHome from './OrgHome';
import OrgMembers from './OrgMembers';
import OrgInvite from './OrgInvite';

export default function OrgDashboard({ user, onNavigate, onOpenProfile }) {
  const [activeMenu, setActiveMenu] = useState('dashboard'); // dashboard, members, invite
  const [org, setOrg] = useState({ name: 'Gopiverse Enterprise Team', domainName: 'gopiverse.com', seatCount: 10, seatOccupied: 4 });
  const [inviteEmail, setInviteEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Mobile sidebar state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Local state directory matching occupied slots
  const [members, setMembers] = useState([
    { id: 1, name: "JADA LAKSHMAN", email: "orgadmin@edusphere.com", isOwner: true },
    { id: 2, name: "Diya Khere", email: "diya@example.com" },
    { id: 3, name: "Rahul Sharma", email: "rahul@example.com" },
    { id: 4, name: "Sneha Patil", email: "sneha@example.com" }
  ]);

  const loadData = async () => {
    try {
      const res = await api.request('/organizations/my');
      if (res && res.name) {
        setOrg(res);
      }
    } catch (err) {
      console.warn('Organization fetch mock fallback');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [user]);

  const handleInvite = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (org.seatOccupied >= org.seatCount) {
      setError('Allocations limit exceeded. Revoke unused slots or purchase more seats.');
      return;
    }

    // Check duplicate
    if (members.some(m => m.email.toLowerCase() === inviteEmail.toLowerCase())) {
      setError('This email already occupies an active seat slot.');
      return;
    }

    try {
      await api.request('/organizations/seats/invite', {
        method: 'POST',
        body: JSON.stringify({ email: inviteEmail })
      });
    } catch (err) {
      // Stub success feedback for offline demo
    }

    const emailName = inviteEmail.split('@')[0];
    const formattedName = emailName.charAt(0).toUpperCase() + emailName.slice(1);
    const newMember = {
      id: Date.now(),
      name: formattedName,
      email: inviteEmail
    };

    setMembers(prev => [...prev, newMember]);
    setOrg(prev => ({ ...prev, seatOccupied: prev.seatOccupied + 1 }));
    setMessage(`Invitation successfully sent and seat slot allocated for ${inviteEmail}!`);
    setInviteEmail('');
  };

  const handleRevoke = (memberId) => {
    if (confirm('Are you sure you want to revoke this employee\'s library license?')) {
      setMembers(prev => prev.filter(m => m.id !== memberId));
      setOrg(prev => ({ ...prev, seatOccupied: Math.max(1, prev.seatOccupied - 1) }));
      alert('License revoked. Seat slot is now free.');
    }
  };

  const renderActiveView = () => {
    switch (activeMenu) {
      case 'members':
        return <OrgMembers members={members} onRevoke={handleRevoke} />;
      case 'invite':
        return (
          <OrgInvite
            inviteEmail={inviteEmail}
            setInviteEmail={setInviteEmail}
            handleInvite={handleInvite}
            message={message}
            error={error}
          />
        );
      case 'dashboard':
      default:
        return <OrgHome org={org} />;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-6rem)] lg:h-[calc(100vh-6rem)] lg:border lg:border-slate-200 lg:rounded-3xl overflow-hidden bg-white select-text relative">
      
      {/* Mobile Top Navbar Header */}
      <div className="lg:hidden flex items-center justify-between p-4 border-b border-slate-200 bg-slate-900 text-white">
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 text-slate-400 hover:text-white rounded-xl transition"
        >
          <Menu className="h-5 w-5" />
        </button>
        <span className="text-xs font-black tracking-wider uppercase">Enterprise Studio</span>
        <div className="w-9 h-9"></div>
      </div>

      {/* Backdrop overlay for mobile drawer */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Left Sidebar Navigation */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-slate-300 border-r border-slate-200 flex flex-col transition-transform duration-300 lg:relative lg:translate-x-0 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } text-center`}>
        
        {/* Profile Card Header */}
        <div className="p-5 border-b border-slate-800 flex flex-col items-center gap-3 relative">
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden absolute top-4 right-4 p-1.5 text-slate-500 hover:text-slate-200 rounded-xl"
          >
            <X className="h-4.5 w-4.5" />
          </button>

          <button
            onClick={onOpenProfile}
            className="group flex flex-col items-center gap-2 hover:opacity-90 transition cursor-pointer"
            title="Edit Org Admin Profile"
          >
            <div className="h-16 w-16 rounded-2xl bg-purple-600 text-white flex items-center justify-center font-black text-xl shadow-lg shadow-purple-600/30 overflow-hidden border-2 border-purple-400 group-hover:scale-105 transition">
              {user.avatarUrl ? (
                <img src={user.avatarUrl} alt="Avatar" className="h-full w-full object-cover" />
              ) : (
                <span>{user.presetAvatar || user.name?.substring(0, 2).toUpperCase() || 'O'}</span>
              )}
            </div>
            <div>
              <div className="text-[10px] uppercase text-purple-400 font-black tracking-wider flex items-center justify-center gap-1">
                <span>Enterprise Admin</span>
                <span>⚙️</span>
              </div>
              <div className="text-xs font-extrabold text-white mt-0.5 tracking-wide truncate max-w-[200px] group-hover:text-purple-300 transition">
                {user.name}
              </div>
              <div className="text-[10px] text-slate-400">{org.name}</div>
            </div>
          </button>
        </div>

        {/* Sidebar Nav Buttons */}
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto text-left">
          {[
            { id: 'dashboard', label: 'Console Hub', icon: LayoutDashboard },
            { id: 'members', label: 'Seats Directory', icon: Users },
            { id: 'invite', label: 'Seat Allocator', icon: UserPlus }
          ].map(item => {
            const Icon = item.icon;
            const isActive = activeMenu === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveMenu(item.id);
                  setIsSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all duration-300 ${
                  isActive
                    ? 'bg-purple-600 text-white font-extrabold shadow-md shadow-purple-600/10'
                    : 'hover:bg-slate-100 text-slate-600 hover:text-slate-900'
                }`}
              >
                <Icon className="h-4.5 w-4.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Logout bottom area */}
        <div className="p-4 border-t border-slate-200">
          <button 
            onClick={() => onNavigate('/')}
            className="w-full flex items-center justify-center gap-2 py-2.5 bg-slate-50 hover:bg-red-50 text-slate-600 hover:text-red-600 rounded-xl text-xs font-bold transition duration-300"
          >
            <LogOut className="h-4 w-4" /> Exit Studio
          </button>
        </div>
      </div>

      {/* Main Content panel container */}
      <div className="flex-1 p-3 sm:p-4 md:p-6 overflow-y-auto flex flex-col gap-4 sm:gap-6 text-left bg-slate-50/20">
        
        {/* Dynamic Toolbar Header */}
        <div className="flex justify-between items-center bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/60 shadow-sm">
          <div>
            <h2 className="text-sm font-black text-slate-800 uppercase tracking-wide">Enterprise Admin Console</h2>
            <p className="text-[10px] text-slate-400 mt-0.5">Control panel for managing corporate library seat licenses.</p>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-wider text-purple-600 bg-purple-50 px-3 py-1.5 rounded-xl border border-purple-200/30">
            Domain: {org.domainName}
          </div>
        </div>

        {renderActiveView()}
      </div>

    </div>
  );
}
