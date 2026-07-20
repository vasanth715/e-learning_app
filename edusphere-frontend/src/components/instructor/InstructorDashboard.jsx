import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { 
  Menu, X, LayoutDashboard, MessageSquare, Settings, LogOut, Plus, Users 
} from 'lucide-react';

import InstructorHome from './InstructorHome';
import InstructorMessages from './InstructorMessages';
import InstructorCourseBuilder from './InstructorCourseBuilder';
import InstructorCommunity from './InstructorCommunity';

export default function InstructorDashboard({ user, onNavigate, onOpenProfile }) {
  const [activeMenu, setActiveMenu] = useState('dashboard'); // dashboard, community, settings
  const [courses, setCourses] = useState([]);
  const [analytics, setAnalytics] = useState({ totalStudents: 320, instructorRating: 4.9, totalCourses: 0, totalEarnings: 0 });
  const [loading, setLoading] = useState(true);

  // Form states for adding courses
  const [isAddOpen, setIsAddOpen] = useState(false);

  // Mobile sidebar state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const loadData = async () => {
    try {
      let list = [];
      try {
        const res = await api.request(`/courses?page=0&size=100`);
        list = (res.content || []).filter(c => c.instructor?.id === user.id || c.instructor?.email === user.email);
        if (list.length === 0) {
          const cached = JSON.parse(localStorage.getItem('edusphere_mock_courses')) || [];
          list = cached.filter(c => c.instructor?.email === user.email);
        }
      } catch (err) {
        const cached = JSON.parse(localStorage.getItem('edusphere_mock_courses')) || [];
        list = cached.filter(c => c.instructor?.email === user.email);
      }
      setCourses(list);

      try {
        const stats = await api.request('/analytics/instructor');
        setAnalytics(stats);
      } catch (e) {
        setAnalytics({
          totalStudents: user.totalStudents || 320,
          instructorRating: user.instructorRating || 4.9,
          totalCourses: list.length,
          totalEarnings: (user.totalStudents || 320) * 24.99
        });
      }
    } catch (err) {
      console.error('Failed to load instructor data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [user]);

  const handleSubmit = async (payload) => {
    try {
      await api.request('/instructor/courses', {
        method: 'POST',
        body: JSON.stringify(payload)
      });
      alert('Course successfully submitted for Admin verification!');
    } catch (err) {
      const cached = JSON.parse(localStorage.getItem('edusphere_mock_courses')) || [];
      const newC = {
        id: Date.now(),
        ...payload,
        instructor: user
      };
      cached.push(newC);
      localStorage.setItem('edusphere_mock_courses', JSON.stringify(cached));
      alert('Course successfully seeded locally in Mock database!');
    }

    setIsAddOpen(false);
    loadData();
  };

  const renderActiveView = () => {
    switch (activeMenu) {
      case 'community':
        return <InstructorCommunity user={user} courses={courses} />;
      case 'feedbacks':
        return <InstructorMessages user={user} />;
      case 'settings':
        return (
          <div className="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm text-left space-y-4">
            <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider">Channel Settings</h3>
            <p className="text-xs text-slate-400">Configure your professional teaching credentials, bank accounts, and email alerts.</p>
          </div>
        );
      case 'dashboard':
      default:
        return (
          <InstructorHome
            courses={courses}
            analytics={analytics}
            setIsAddOpen={setIsAddOpen}
            onNavigate={onNavigate}
          />
        );
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  const instructorName = user.name || "JADA LAKSHMAN";

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
        <span className="text-xs font-black tracking-wider uppercase">Studio Panel</span>
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
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-950 text-slate-300 border-r border-slate-800 flex flex-col transition-transform duration-300 lg:relative lg:translate-x-0 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } text-center`}>
        
        {/* Profile Card Header */}
        <div className="p-6 border-b border-slate-800 flex flex-col items-center gap-4 relative">
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden absolute top-4 right-4 p-1.5 text-slate-500 hover:text-white hover:bg-slate-800 rounded-xl"
          >
            <X className="h-4.5 w-4.5" />
          </button>

          <div className="h-24 w-24 rounded-full overflow-hidden border-2 border-purple-500/80 shadow-md shadow-purple-500/10">
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80" 
              alt={instructorName}
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <div className="text-[10px] uppercase text-purple-400 font-black tracking-wider">Your channel</div>
            <div className="text-xs font-extrabold text-white mt-1 uppercase tracking-wide">{instructorName}</div>
          </div>
        </div>

        {/* Sidebar Nav Buttons */}
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto text-left">
          {[
            { id: 'dashboard', label: 'Dashboard Hub', icon: LayoutDashboard },
            { id: 'community', label: 'Community Feed', icon: Users },
            { id: 'feedbacks', label: 'Send feedback', icon: MessageSquare },
            { id: 'settings', label: 'Settings Panel', icon: Settings }
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
                    ? 'bg-slate-800 text-white font-extrabold border-l-4 border-purple-500 rounded-l-none'
                    : 'hover:bg-slate-900 text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className="h-4.5 w-4.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={() => onNavigate('/')}
            className="w-full flex items-center justify-center gap-2 py-2.5 bg-slate-900 hover:bg-red-950/20 text-slate-400 hover:text-red-400 rounded-xl text-xs font-bold transition duration-300"
          >
            <LogOut className="h-4 w-4" /> Exit Studio
          </button>
        </div>
      </div>

      {/* Main Content panel container */}
      <div className="flex-1 p-3 sm:p-4 md:p-6 overflow-y-auto flex flex-col gap-4 sm:gap-6 text-left bg-slate-50/30">
        
        {/* Dynamic Toolbar Header */}
        <div className="flex justify-between items-center bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/60 shadow-sm">
          <div className="flex items-center gap-3">
            <button 
              onClick={onOpenProfile}
              className="h-10 w-10 rounded-full overflow-hidden bg-purple-100 text-purple-700 flex items-center justify-center font-black text-xs shrink-0 border border-purple-200 hover:border-purple-500 shadow-sm cursor-pointer transition"
              title="Edit Profile"
            >
              {user.avatarUrl ? (
                <img src={user.avatarUrl} alt="Avatar" className="h-full w-full object-cover" />
              ) : (
                <span>{user.presetAvatar || user.name?.substring(0, 2).toUpperCase() || 'I'}</span>
              )}
            </button>
            <div>
              <h2 className="text-sm font-black text-slate-800 uppercase tracking-wide flex items-center gap-2">
                <span>Instructor Studio</span>
                <button onClick={onOpenProfile} className="text-[10px] text-purple-600 bg-purple-50 hover:bg-purple-100 px-2 py-0.5 rounded-full font-bold transition">
                  Edit Profile
                </button>
              </h2>
              <p className="text-[10px] text-slate-400 mt-0.5">Welcome back, {user.name} • Manage your courses & content</p>
            </div>
          </div>
          {activeMenu === 'dashboard' && (
            <button 
              onClick={() => setIsAddOpen(true)}
              className="px-3 py-1.5 bg-purple-600 text-white rounded-xl text-[10px] font-black shadow-md shadow-purple-600/10 hover:scale-105 active:scale-95 transition flex items-center gap-1"
            >
              <Plus className="h-3.5 w-3.5" /> Add Course
            </button>
          )}
        </div>

        {renderActiveView()}
      </div>

      {/* Modular multi-step course wizard */}
      <InstructorCourseBuilder
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSubmit={handleSubmit}
        user={user}
      />

    </div>
  );
}
