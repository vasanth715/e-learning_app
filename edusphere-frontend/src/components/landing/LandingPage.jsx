import React from 'react';
import HeroSection from './HeroSection';
import TrendingCourses from './TrendingCourses';
import ExpertiseSection from './ExpertiseSection';
import TechStackSection from './TechStackSection';
import TrustedClients from './TrustedClients';
import Testimonials from './Testimonials';
import { Users, Award, BookOpen, Star, Sparkles, CheckCircle2 } from 'lucide-react';

export default function LandingPage({ onStartLearning, onNavigate }) {
  return (
    <div className="space-y-16 py-8 text-slate-800 select-text text-left max-w-[1440px] mx-auto">
      
      {/* Hero Banner Section */}
      <HeroSection onStartLearning={onStartLearning} onNavigate={onNavigate} />

      {/* 10x Platform Metrics & Trust Bar */}
      <div className="bg-slate-950 rounded-3xl p-6 sm:p-8 border border-slate-800 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-1/3 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 relative z-10 text-center">
          <div className="space-y-1 border-r border-slate-800/80 last:border-0 pr-4">
            <div className="flex items-center justify-center gap-1.5 text-purple-400 font-black text-2xl sm:text-3xl">
              <Users className="h-6 w-6 text-purple-400" />
              <span>50,000+</span>
            </div>
            <p className="text-[10px] sm:text-xs text-slate-400 font-bold uppercase tracking-wider">Active Global Learners</p>
          </div>

          <div className="space-y-1 border-r border-slate-800/80 last:border-0 pr-4">
            <div className="flex items-center justify-center gap-1.5 text-indigo-400 font-black text-2xl sm:text-3xl">
              <BookOpen className="h-6 w-6 text-indigo-400" />
              <span>1.2M+</span>
            </div>
            <p className="text-[10px] sm:text-xs text-slate-400 font-bold uppercase tracking-wider">Lessons Streamed</p>
          </div>

          <div className="space-y-1 border-r border-slate-800/80 last:border-0 pr-4">
            <div className="flex items-center justify-center gap-1.5 text-emerald-400 font-black text-2xl sm:text-3xl">
              <CheckCircle2 className="h-6 w-6 text-emerald-400" />
              <span>99.4%</span>
            </div>
            <p className="text-[10px] sm:text-xs text-slate-400 font-bold uppercase tracking-wider">Course Satisfaction</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-center gap-1.5 text-amber-400 font-black text-2xl sm:text-3xl">
              <Star className="h-6 w-6 fill-amber-400 text-amber-400" />
              <span>4.9 / 5.0</span>
            </div>
            <p className="text-[10px] sm:text-xs text-slate-400 font-bold uppercase tracking-wider">Average Student Rating</p>
          </div>
        </div>
      </div>

      {/* Trending Courses Section */}
      <TrendingCourses onNavigate={onNavigate} />

      {/* Expertise Sections */}
      <ExpertiseSection />

      {/* Tech Stack Section */}
      <TechStackSection />

      {/* Trusted Clients Logo List */}
      <TrustedClients />

      {/* Testimonials Review Feed */}
      <Testimonials />

    </div>
  );
}
