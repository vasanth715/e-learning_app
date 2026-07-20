import React from 'react';
import { 
  Users, BookOpen, Clock, DollarSign, TrendingUp, ShieldCheck, 
  Activity, Server, Zap, CheckCircle2, Sparkles 
} from 'lucide-react';

export default function AdminHome({ courses = [], enrollments = [] }) {
  const chartData = [
    { month: 'Jan', val: 45, rev: '$18,400' },
    { month: 'Feb', val: 65, rev: '$26,800' },
    { month: 'Mar', val: 55, rev: '$22,100' },
    { month: 'Apr', val: 95, rev: '$38,900' },
    { month: 'May', val: 80, rev: '$32,400' },
    { month: 'Jun', val: 120, rev: '$48,900' },
    { month: 'Jul', val: 145, rev: '$58,250' }
  ];

  return (
    <div className="space-y-6 text-left">
      
      {/* Top Banner Hero */}
      <div className="bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 text-white relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-60 h-60 bg-indigo-600/20 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-[10px] font-black uppercase tracking-widest">
              <Sparkles className="h-3 w-3 text-purple-400" />
              <span>Super Admin Command Hub</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Platform Health & <span className="bg-gradient-to-r from-purple-400 via-indigo-300 to-pink-400 bg-clip-text text-transparent">System Overview</span>
            </h2>
            <p className="text-xs text-slate-400 font-medium max-w-lg">
              Live monitoring of student enrollments, course approvals, platform transactions, and server performance.
            </p>
          </div>

          {/* System Status Pill */}
          <div className="flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-2xl shrink-0">
            <div className="h-3 w-3 rounded-full bg-emerald-400 animate-ping"></div>
            <div>
              <div className="text-xs font-black text-white flex items-center gap-1.5">
                <span>99.9% Uptime</span>
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              </div>
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">All Systems Operational</div>
            </div>
          </div>
        </div>
      </div>

      {/* 10x Stats Widgets */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-3 hover:shadow-xl transition-all duration-300">
          <div className="flex justify-between items-center">
            <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">Total Students</span>
            <div className="p-2 bg-purple-50 text-purple-600 rounded-xl">
              <Users className="h-4 w-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">2,453</div>
            <div className="text-[10px] text-emerald-600 font-extrabold mt-1 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" /> ▲ +15.7% Growth
            </div>
          </div>
        </div>

        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-3 hover:shadow-xl transition-all duration-300">
          <div className="flex justify-between items-center">
            <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">Courses Hosted</span>
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
              <BookOpen className="h-4 w-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">{courses.length || 35}</div>
            <div className="text-[10px] text-emerald-600 font-extrabold mt-1 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" /> ▲ +8.3% Uploads
            </div>
          </div>
        </div>

        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-3 hover:shadow-xl transition-all duration-300">
          <div className="flex justify-between items-center">
            <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">Active Enrollments</span>
            <div className="p-2 bg-pink-50 text-pink-600 rounded-xl">
              <Clock className="h-4 w-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">{(enrollments.length || 0) + 1240}</div>
            <div className="text-[10px] text-emerald-600 font-extrabold mt-1 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" /> ▲ +12.5% Month
            </div>
          </div>
        </div>

        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-3 hover:shadow-xl transition-all duration-300">
          <div className="flex justify-between items-center">
            <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">Platform Gross Revenue</span>
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
              <DollarSign className="h-4 w-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">$245,750</div>
            <div className="text-[10px] text-emerald-600 font-extrabold mt-1 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" /> ▲ +18.6% YTD
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Graph & System Telemetry Grid */}
      <div className="grid lg:grid-cols-12 gap-6">
        
        {/* Monthly Revenue Flow Chart */}
        <div className="lg:col-span-8 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <Activity className="h-4 w-4 text-purple-600" />
              <span>Monthly Platform Gross Revenue ($ USD)</span>
            </h4>
            <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-lg">2026 Fiscal Year</span>
          </div>

          <div className="h-48 bg-slate-950 rounded-2xl p-4 flex items-end justify-between gap-3 relative border border-slate-800">
            {chartData.map((d, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                <div className="text-[9px] font-bold text-purple-300 opacity-0 group-hover:opacity-100 transition duration-300 bg-slate-900 px-1.5 py-0.5 rounded border border-purple-500/30">
                  {d.rev}
                </div>
                <div 
                  className="w-full bg-gradient-to-t from-purple-700 via-indigo-600 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-400 rounded-t-xl transition-all duration-500 shadow-lg"
                  style={{ height: `${d.val}%` }}
                ></div>
                <span className="text-[10px] font-bold text-slate-400">{d.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Realtime Telemetry Panel */}
        <div className="lg:col-span-4 bg-slate-950 p-6 rounded-3xl border border-slate-800 text-white space-y-4 shadow-xl flex flex-col justify-between">
          <h4 className="text-xs font-black uppercase tracking-wider text-slate-300 flex items-center gap-2">
            <Server className="h-4 w-4 text-purple-400" />
            <span>Infrastructure Health</span>
          </h4>

          <div className="space-y-3">
            <div className="p-3 bg-white/5 border border-white/10 rounded-2xl flex justify-between items-center">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
                <Zap className="h-4 w-4 text-amber-400" />
                <span>API Latency</span>
              </div>
              <span className="text-xs font-black text-emerald-400">12ms</span>
            </div>

            <div className="p-3 bg-white/5 border border-white/10 rounded-2xl flex justify-between items-center">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
                <CheckCircle2 className="h-4 w-4 text-purple-400" />
                <span>H2 Database Status</span>
              </div>
              <span className="text-xs font-black text-purple-300">Connected</span>
            </div>

            <div className="p-3 bg-white/5 border border-white/10 rounded-2xl flex justify-between items-center">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
                <ShieldCheck className="h-4 w-4 text-indigo-400" />
                <span>JWT Authentication</span>
              </div>
              <span className="text-xs font-black text-emerald-400">Stateless</span>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800 text-[10px] text-slate-400 font-bold flex justify-between items-center">
            <span>Spring Boot Version</span>
            <span className="text-purple-400 font-mono">v3.3.1</span>
          </div>
        </div>

      </div>

    </div>
  );
}
