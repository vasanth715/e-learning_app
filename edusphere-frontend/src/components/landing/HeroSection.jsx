import React from 'react';
import { 
  Sparkles, ArrowRight, Play, Award, Users, Star, 
  CheckCircle2, Code2, Zap, ShieldCheck, BookOpen, Terminal
} from 'lucide-react';

export default function HeroSection({ onStartLearning, onNavigate }) {
  return (
    <section className="relative rounded-[36px] bg-slate-950 text-white overflow-hidden p-6 sm:p-10 lg:p-14 border border-slate-800/80 shadow-2xl my-4 text-left">
      
      {/* Background Decorative Ambient Radial Glow Spheres */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-600/30 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-1/2 -right-32 w-96 h-96 bg-indigo-600/25 rounded-full blur-[130px] pointer-events-none"></div>
      <div className="absolute -bottom-32 left-1/3 w-80 h-80 bg-pink-500/20 rounded-full blur-[110px] pointer-events-none"></div>
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"></div>

      <div className="relative z-10 max-w-[1320px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        
        {/* Left Column: Headline, CTAs, Trust Badges */}
        <div className="lg:col-span-7 space-y-6 sm:space-y-8">
          
          {/* Glassmorphic Top Badge Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-purple-500/30 backdrop-blur-md shadow-lg shadow-purple-500/10">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 -ml-4"></span>
            <span className="text-[11px] font-black tracking-wider uppercase bg-gradient-to-r from-purple-300 via-indigo-200 to-pink-300 bg-clip-text text-transparent flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-purple-400" />
              Next-Gen E-Learning Ecosystem 2026
            </span>
          </div>

          {/* Main Hero Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-white">
            Master High-Demand <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-purple-400 via-indigo-300 to-pink-400 bg-clip-text text-transparent">
              Tech Skills & Code
            </span> <br />
            with Live Hands-On Mentorship.
          </h1>

          {/* Subtitle */}
          <p className="text-xs sm:text-base text-slate-300 leading-relaxed max-w-2xl font-medium">
            Join over <strong className="text-white font-bold">25,000+ developers</strong> learning Java Full Stack, Spring Boot, React, and AI Architecture through interactive sandboxes, verified certifications, and top hiring partner referrals.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={onStartLearning}
              className="px-7 py-4 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-2xl text-xs sm:text-sm font-black shadow-xl shadow-purple-600/30 transition duration-300 active:scale-95 flex items-center gap-2.5 group border border-purple-400/30"
            >
              <span>Get Started Free</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => onNavigate('/catalog')}
              className="px-7 py-4 bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700/80 rounded-2xl text-xs sm:text-sm font-bold transition duration-300 backdrop-blur-sm flex items-center gap-2 group"
            >
              <BookOpen className="h-4 w-4 text-purple-400 group-hover:scale-110 transition-transform" />
              <span>Explore 100+ Courses</span>
            </button>
          </div>

          {/* Quick Metrics & Feature Checkmarks */}
          <div className="pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-4 sm:gap-6 text-slate-300">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
              <div className="h-8 w-8 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <div>
                <div className="text-xs sm:text-sm font-black text-white">Certified</div>
                <div className="text-[10px] text-slate-400">Accredited Badges</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
              <div className="h-8 w-8 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
                <Zap className="h-4 w-4" />
              </div>
              <div>
                <div className="text-xs sm:text-sm font-black text-white">Live Labs</div>
                <div className="text-[10px] text-slate-400">Real IDE Sandbox</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
              <div className="h-8 w-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                <Award className="h-4 w-4" />
              </div>
              <div>
                <div className="text-xs sm:text-sm font-black text-white">Hiring Calls</div>
                <div className="text-[10px] text-slate-400">500+ Top Recruiters</div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: 3D-Style Interactive Glassmorphism Dashboard Preview */}
        <div className="lg:col-span-5 relative flex justify-center">
          
          {/* Main Card */}
          <div className="w-full max-w-md bg-slate-900/90 border border-slate-700/80 rounded-3xl p-5 shadow-2xl backdrop-blur-xl space-y-4 relative z-10 transform lg:rotate-1 hover:rotate-0 transition-transform duration-500">
            
            {/* Top Card Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500"></div>
                <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                <div className="h-3 w-3 rounded-full bg-emerald-500"></div>
                <span className="text-[11px] font-mono text-slate-400 ml-2">EduSphere_IDE.java</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 text-[10px] font-mono font-bold">LIVE SESSION</span>
            </div>

            {/* Code Snippet / Active Course Highlight */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 font-mono text-xs space-y-2">
              <div className="flex justify-between text-[10px] text-slate-400 border-b border-slate-800 pb-1.5">
                <span>// Module 4: Spring Boot Microservices</span>
                <span className="text-emerald-400 flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> Compiled</span>
              </div>
              <div className="text-purple-400">
                <span className="text-pink-400">@RestController</span> <br />
                <span className="text-blue-400">public class</span> <span className="text-yellow-300">LearningEngine</span> &#123;
              </div>
              <div className="pl-4 text-slate-300 text-[11px]">
                <span className="text-pink-400">@GetMapping</span>(<span className="text-emerald-300">"/launch-career"</span>) <br />
                <span className="text-blue-400">public</span> Response <span className="text-indigo-300">buildSkills</span>() &#123; <br />
                &nbsp;&nbsp;<span className="text-purple-400">return</span> Response.<span className="text-yellow-300">hired</span>(99.8); <br />
                &#125;
              </div>
              <div className="text-purple-400">&#125;</div>
            </div>

            {/* Live Progress Tracker Card */}
            <div className="p-3.5 bg-slate-800/80 rounded-2xl border border-slate-700/60 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-extrabold text-slate-200 flex items-center gap-1.5">
                  <Terminal className="h-3.5 w-3.5 text-purple-400" />
                  Java Full Stack 2026
                </span>
                <span className="text-purple-400 font-black text-xs">78% Done</span>
              </div>
              <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden p-0.5 border border-slate-700">
                <div className="bg-gradient-to-r from-purple-500 to-indigo-500 h-full rounded-full w-[78%] transition-all duration-1000 shadow-sm shadow-purple-500/50"></div>
              </div>
            </div>

            {/* Student Community & Rating Row */}
            <div className="flex items-center justify-between pt-1 text-xs">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2 overflow-hidden">
                  <span className="inline-block h-7 w-7 rounded-full ring-2 ring-slate-900 bg-purple-600 text-white font-bold text-[10px] text-center leading-7">DK</span>
                  <span className="inline-block h-7 w-7 rounded-full ring-2 ring-slate-900 bg-indigo-600 text-white font-bold text-[10px] text-center leading-7">RS</span>
                  <span className="inline-block h-7 w-7 rounded-full ring-2 ring-slate-900 bg-emerald-600 text-white font-bold text-[10px] text-center leading-7">SP</span>
                  <span className="inline-block h-7 w-7 rounded-full ring-2 ring-slate-900 bg-pink-600 text-white font-bold text-[10px] text-center leading-7">+12k</span>
                </div>
                <span className="text-[11px] font-bold text-slate-300">Active Learners</span>
              </div>

              <div className="flex items-center gap-1 text-amber-400 font-extrabold text-xs">
                <Star className="h-3.5 w-3.5 fill-amber-400" />
                <span>4.9 / 5.0</span>
              </div>
            </div>

          </div>

          {/* Floating Glass Badges */}
          <div className="absolute -top-6 -left-6 bg-slate-900/90 border border-purple-500/40 px-3.5 py-2 rounded-2xl shadow-xl backdrop-blur-md hidden sm:flex items-center gap-2 text-xs font-bold text-white z-20 animate-bounce">
            <span className="text-base">🔥</span>
            <div>
              <div className="text-[9px] text-slate-400 uppercase font-black">Daily Streak</div>
              <div className="text-purple-300 font-black text-xs">7 Days Active</div>
            </div>
          </div>

          <div className="absolute -bottom-6 -right-4 bg-slate-900/90 border border-indigo-500/40 px-4 py-2.5 rounded-2xl shadow-xl backdrop-blur-md hidden sm:flex items-center gap-2.5 text-xs font-bold text-white z-20">
            <div className="h-7 w-7 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              💼
            </div>
            <div>
              <div className="text-[9px] text-slate-400 uppercase font-black">Hiring Flag</div>
              <div className="text-emerald-400 font-black text-xs">Interview Ready</div>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}
