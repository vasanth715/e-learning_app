import React from 'react';
import { Play, Flame, Zap, Award, BookOpen, ArrowRight, Sparkles, Trophy } from 'lucide-react';
import ActivityTrackerCalendar from './ActivityTrackerCalendar';

export default function StudentHome({ user, analytics, enrollments, getCourseDetails, onNavigate }) {
  const activeEnrollment = enrollments[0];
  const activeCourse = activeEnrollment ? getCourseDetails(activeEnrollment.courseId) : null;

  return (
    <div className="space-y-6 text-left">
      
      {/* 10x Greetings Hero + Activity Calendar */}
      <div className="grid lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Side: Student Welcome Hero Card */}
        <div className="lg:col-span-7 bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 text-white flex flex-col justify-between gap-6 relative overflow-hidden shadow-xl">
          {/* Ambient Glowing Orbs */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-600/20 rounded-full blur-2xl pointer-events-none"></div>

          <div className="relative z-10 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-[10px] font-black uppercase tracking-widest">
              <Sparkles className="h-3 w-3 text-purple-400" />
              <span>Learner Command Center</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Welcome back, <span className="bg-gradient-to-r from-purple-400 to-indigo-300 bg-clip-text text-transparent">{user.name}</span> 👋
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 font-medium leading-relaxed max-w-md">
              You're making great progress! Continue your active learning path to maintain your weekly streak.
            </p>
          </div>

          <div className="relative z-10 flex flex-wrap items-center gap-4 pt-2">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 px-4 py-2.5 rounded-2xl flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-white shadow-md">
                <Flame className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs font-black text-white">{analytics.streak} Days</div>
                <div className="text-[9px] text-amber-400 font-bold uppercase tracking-wider">Active Streak</div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-md border border-white/10 px-4 py-2.5 rounded-2xl flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-md">
                <Zap className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs font-black text-white">{analytics.xp} XP</div>
                <div className="text-[9px] text-purple-300 font-bold uppercase tracking-wider">Total Score</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Active Activity Tracker Calendar */}
        <div className="lg:col-span-5 flex">
          <ActivityTrackerCalendar />
        </div>
      </div>

      {/* Active Enrolled Course Spotlight Banner */}
      {enrollments.length > 0 && activeCourse ? (
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-purple-700 via-indigo-700 to-purple-900 p-6 sm:p-8 text-white shadow-2xl border border-purple-500/30">
          <div className="absolute right-0 bottom-0 text-9xl opacity-10 select-none pointer-events-none">💻</div>

          <div className="relative z-10 space-y-5">
            <div className="flex items-center justify-between">
              <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border border-white/20">
                ⚡️ Active Course Spotlight
              </span>
              <span className="text-xs font-bold text-purple-200">
                {activeEnrollment.progressPercent}% Completed
              </span>
            </div>

            <div className="space-y-1 max-w-xl">
              <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
                {activeCourse.title}
              </h3>
              <p className="text-xs text-purple-100 font-medium line-clamp-1">
                {activeCourse.description || 'Pick up right where you left off in your latest lesson module.'}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1.5 max-w-xl">
              <div className="w-full bg-slate-900/40 backdrop-blur-sm h-2.5 rounded-full overflow-hidden p-0.5 border border-white/10">
                <div 
                  className="bg-gradient-to-r from-amber-400 to-emerald-400 h-full rounded-full transition-all duration-500 shadow-sm"
                  style={{ width: `${activeEnrollment.progressPercent}%` }}
                ></div>
              </div>
            </div>

            <button
              onClick={() => onNavigate(`/course/${activeEnrollment.courseId}`)}
              className="px-6 py-3 bg-white text-purple-900 font-black text-xs rounded-2xl hover:bg-purple-50 transition shadow-xl flex items-center gap-2 group active:scale-95 cursor-pointer"
            >
              <Play className="h-4 w-4 fill-purple-900 text-purple-900 group-hover:scale-110 transition" />
              <span>Resume Course Player</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-12 text-center space-y-4 shadow-sm">
          <div className="h-16 w-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mx-auto text-3xl">
            📚
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-black text-slate-800">No Active Enrollments Yet</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">You haven't enrolled in any learning path. Browse our 35+ industry accredited catalog to start learning!</p>
          </div>
          <button 
            onClick={() => onNavigate('/catalog')} 
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-black rounded-2xl text-xs shadow-lg shadow-purple-600/20 hover:scale-105 transition active:scale-95 cursor-pointer"
          >
            Explore Course Library
          </button>
        </div>
      )}

    </div>
  );
}
