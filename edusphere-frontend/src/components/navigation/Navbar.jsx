import React, { useState } from 'react';
import { 
  BookOpen, Bell, LogOut, User, Menu, X, Settings, 
  Search, Compass, LayoutDashboard, Home 
} from 'lucide-react';

export default function Navbar({ 
  user, 
  route, 
  onNavigate, 
  onOpenAuth, 
  onOpenProfile, 
  onLogout,
  notifications = [],
  markAllRead
}) {
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="bg-white/90 backdrop-blur-xl border-b border-slate-200/80 sticky top-0 z-40 shadow-sm transition-all select-none">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand Logo & Tagline */}
        <div className="flex items-center gap-6">
          <div 
            onClick={() => onNavigate('/')} 
            className="flex items-center gap-2.5 cursor-pointer select-none group"
          >
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-pink-500 text-white flex items-center justify-center text-sm font-black shadow-md shadow-purple-600/20 group-hover:scale-105 transition duration-300">
              🎓
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-black text-slate-900 text-base tracking-tight">EduSphere</span>
                <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent font-black text-base">LearnHub</span>
              </div>
              <span className="text-[9px] text-slate-400 font-bold tracking-widest uppercase -mt-0.5">Enterprise LMS</span>
            </div>
          </div>

          {/* Main Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/70 p-1 rounded-2xl border border-slate-200/60 text-xs font-bold">
            <button 
              onClick={() => onNavigate('/')}
              className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition ${
                route === '#/' || route === '' 
                  ? 'bg-white text-purple-700 shadow-sm font-black' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <Home className="h-3.5 w-3.5" />
              Home
            </button>

            <button 
              onClick={() => onNavigate('/catalog')}
              className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition ${
                route === '#/catalog' 
                  ? 'bg-white text-purple-700 shadow-sm font-black' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <Compass className="h-3.5 w-3.5" />
              Browse Catalog
            </button>

            {user && (
              <button 
                onClick={() => onNavigate('/dashboard')}
                className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition ${
                  route === '#/dashboard' 
                    ? 'bg-white text-purple-700 shadow-sm font-black' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                }`}
              >
                <LayoutDashboard className="h-3.5 w-3.5" />
                {(Array.isArray(user.roles) && user.roles.some(r => r.toLowerCase().includes('instructor'))) || user.email?.toLowerCase().includes('instructor')
                  ? 'Instructor Studio' 
                  : 'My Dashboard'}
              </button>
            )}
          </nav>
        </div>

        {/* Center Search Input (Desktop) */}
        <div className="hidden lg:flex items-center relative flex-1 max-w-xs">
          <Search className="absolute left-3.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
          <input 
            type="text"
            placeholder="Search courses, skills, paths..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && searchQuery.trim()) {
                onNavigate('/catalog');
              }
            }}
            className="w-full bg-slate-100/80 border border-slate-200/80 rounded-2xl pl-9 pr-8 py-1.5 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:bg-white transition"
          />
          <span className="absolute right-2.5 top-2 text-[9px] font-mono font-bold text-slate-400 bg-slate-200/80 px-1.5 py-0.5 rounded border border-slate-300/60">
            ⌘K
          </span>
        </div>

        {/* Right Control Center */}
        <div className="flex items-center gap-3">
          
          {user ? (
            <>
              {/* Notifications Bell */}
              <div className="relative">
                <button 
                  onClick={() => {
                    setIsNotifOpen(!isNotifOpen);
                    if (!isNotifOpen && markAllRead) markAllRead();
                  }}
                  className="p-2 rounded-xl text-slate-500 hover:text-purple-600 hover:bg-purple-50 border border-transparent hover:border-purple-100 transition relative"
                  title="Alert Notifications"
                >
                  <Bell className="h-4.5 w-4.5" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                    </span>
                  )}
                </button>

                {/* Dropdown Panel */}
                {isNotifOpen && (
                  <div className="absolute right-0 mt-3 w-80 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-100 p-4 space-y-3 z-50 text-left animate-fade-in">
                    <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                      <div className="flex items-center gap-1.5">
                        <Bell className="h-3.5 w-3.5 text-purple-600" />
                        <span className="text-xs font-black text-slate-800 uppercase tracking-wider">Alert Notices</span>
                      </div>
                      <button onClick={() => setIsNotifOpen(false)} className="text-[10px] text-slate-400 font-bold hover:underline">Close</button>
                    </div>
                    <div className="space-y-2 max-h-56 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <p className="text-[11px] text-slate-400 italic text-center py-4">No new notifications.</p>
                      ) : (
                        notifications.map(n => (
                          <div key={n.id} className="p-2.5 bg-slate-50/80 border border-slate-100 rounded-xl space-y-1 hover:bg-purple-50/50 transition">
                            <div className="text-[11px] font-black text-slate-800 flex items-center justify-between">
                              <span>{n.title}</span>
                              <span className="h-1.5 w-1.5 rounded-full bg-purple-500"></span>
                            </div>
                            <p className="text-[10px] text-slate-500 leading-relaxed">{n.message}</p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* User Profile Navigation Pill */}
              <button
                onClick={onOpenProfile}
                className="flex items-center gap-2.5 p-1 pl-1.5 pr-3 rounded-full bg-slate-100/80 hover:bg-purple-50 border border-slate-200/80 hover:border-purple-200 transition text-left group shadow-sm cursor-pointer"
                title="Open Account Settings & Profile"
              >
                <div className="h-7 w-7 rounded-full overflow-hidden border border-purple-300 bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-xs shrink-0 shadow-sm group-hover:scale-105 transition">
                  {user.avatarUrl ? (
                    <img src={user.avatarUrl} alt="User Avatar" className="h-full w-full object-cover" />
                  ) : (
                    <span>{user.presetAvatar || user.name?.substring(0, 2).toUpperCase() || 'U'}</span>
                  )}
                </div>
                
                <div className="hidden sm:flex flex-col">
                  <span className="text-xs font-black text-slate-800 group-hover:text-purple-600 transition truncate max-w-[110px]">
                    {user.name}
                  </span>
                  <span className="text-[9px] font-bold text-purple-600 uppercase tracking-widest -mt-0.5">
                    {user.roles?.[0] || 'Student'}
                  </span>
                </div>

                <Settings className="h-3.5 w-3.5 text-slate-400 group-hover:text-purple-600 transition shrink-0 ml-0.5" />
              </button>

              {/* Quick Logout Button */}
              <button 
                onClick={onLogout}
                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition"
                title="Logout Account"
              >
                <LogOut className="h-4.5 w-4.5" />
              </button>
            </>
          ) : (
            <button 
              onClick={onOpenAuth}
              className="px-5 py-2.5 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-2xl text-xs font-black shadow-lg shadow-purple-600/20 transition active:scale-95 border border-purple-400/30 flex items-center gap-1.5 cursor-pointer"
            >
              <User className="h-3.5 w-3.5" />
              <span>Sign In</span>
            </button>
          )}

          {/* Mobile Navigation Toggle Icon */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-slate-600 hover:text-purple-600 hover:bg-slate-100 rounded-xl transition"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

        </div>
      </div>

      {/* Mobile Slide-Down Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200/80 bg-white/95 backdrop-blur-xl p-4 space-y-3 animate-fade-in text-left">
          <button
            onClick={() => { onNavigate('/'); setIsMobileMenuOpen(false); }}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-700 hover:bg-purple-50 hover:text-purple-600 transition"
          >
            <Home className="h-4 w-4" />
            <span>Home Hub</span>
          </button>

          <button
            onClick={() => { onNavigate('/catalog'); setIsMobileMenuOpen(false); }}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-700 hover:bg-purple-50 hover:text-purple-600 transition"
          >
            <Compass className="h-4 w-4" />
            <span>Browse Catalog</span>
          </button>

          {user && (
            <button
              onClick={() => { onNavigate('/dashboard'); setIsMobileMenuOpen(false); }}
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-700 hover:bg-purple-50 hover:text-purple-600 transition"
            >
              <LayoutDashboard className="h-4 w-4" />
              <span>My Dashboard</span>
            </button>
          )}
        </div>
      )}
    </header>
  );
}
