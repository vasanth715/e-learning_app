import React from 'react';
import { Play } from 'lucide-react';
import ActivityTrackerCalendar from './ActivityTrackerCalendar';

export default function StudentHome({ user, analytics, enrollments, getCourseDetails, onNavigate }) {
  return (
    <div className="space-y-6">
      
      {/* Greetings + Activity Calendar Row */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch">
        
        {/* Left Side: Greeting Info */}
        <div className="flex-1 bg-slate-50 p-4 sm:p-6 rounded-2xl border border-slate-100 flex flex-col justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-slate-800">Hello, {user.name} 👋</h3>
            <p className="text-xs text-slate-400 mt-0.5">Ready to continue your learning? Pick up where you left off below.</p>
          </div>
          <div className="flex gap-4">
            <div className="bg-amber-50 px-3 py-1.5 rounded-xl text-center">
              <div className="text-[9px] text-amber-500 font-bold uppercase">Streak</div>
              <div className="text-xs font-black text-amber-700">{analytics.streak} Days</div>
            </div>
            <div className="bg-purple-50 px-3 py-1.5 rounded-xl text-center">
              <div className="text-[9px] text-purple-500 font-bold uppercase">Score</div>
              <div className="text-xs font-black text-purple-700">{analytics.xp} XP</div>
            </div>
          </div>
        </div>

        {/* Right Side: Active Tracker Calendar */}
        <ActivityTrackerCalendar />
      </div>

      {/* Active Class */}
      {enrollments.length > 0 ? (
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden text-left">
          <div className="relative z-10 space-y-4">
            <span className="bg-white/20 px-3 py-0.5 rounded-full text-[10px] font-bold">Active Course Progress</span>
            <div>
              <h4 className="text-base font-extrabold">{getCourseDetails(enrollments[0].courseId).title}</h4>
              <p className="text-[10px] text-white/80 mt-0.5">Completed lessons: {enrollments[0].progressPercent}%</p>
            </div>
            <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden">
              <div className="bg-white h-full" style={{ width: `${enrollments[0].progressPercent}%` }}></div>
            </div>
            <button
              onClick={() => onNavigate(`/course/${enrollments[0].courseId}`)}
              className="px-4 py-2 bg-white text-purple-700 text-xs font-bold rounded-xl hover:scale-105 transition flex items-center gap-1"
            >
              <Play className="h-3 w-3 fill-purple-700 text-purple-700" /> Resume Course
            </button>
          </div>
          <div className="absolute right-0 bottom-0 text-9xl opacity-10 select-none">💻</div>
        </div>
      ) : (
        <div className="bg-slate-50 p-8 rounded-2xl text-center space-y-3">
          <span className="text-3xl">📚</span>
          <p className="text-xs text-slate-400">You are not enrolled in any path. Browse the catalog to start.</p>
          <button onClick={() => onNavigate('/catalog')} className="px-4 py-2 bg-purple-600 text-white rounded-xl text-xs font-bold">
            Browse Catalog
          </button>
        </div>
      )}

    </div>
  );
}
