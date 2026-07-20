import React, { useState } from 'react';
import { BookOpen, CheckCircle2, Clock, ShieldAlert, Sparkles, Check, ArrowRight } from 'lucide-react';

export default function AdminCourses({ courses = [], handleApprove }) {
  const [activeTab, setActiveTab] = useState('pending'); // pending, published

  const pending = courses.filter(c => c.status === 'pending_review' || c.status === 'draft');
  const published = courses.filter(c => c.status === 'published');

  return (
    <div className="space-y-6 text-left">
      
      {/* Header Banner */}
      <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 text-white flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-black uppercase tracking-widest border border-purple-500/30">
            <BookOpen className="h-3 w-3" />
            <span>Curriculum Moderation Portal</span>
          </div>
          <h2 className="text-xl font-black text-white">Course Approvals & Publishing</h2>
          <p className="text-xs text-slate-400">Review submitted instructor courses, inspect syllabi, and publish live to public catalog.</p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('pending')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition ${
              activeTab === 'pending'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            Pending Review ({pending.length})
          </button>
          <button
            onClick={() => setActiveTab('published')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition ${
              activeTab === 'published'
                ? 'bg-emerald-500 text-slate-950 shadow-md'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            Live Published ({published.length})
          </button>
        </div>
      </div>

      {/* Courses Feed */}
      {activeTab === 'pending' && (
        <div className="space-y-4">
          <h3 className="text-xs font-black text-slate-500 uppercase tracking-wider">Awaiting Review Submissions</h3>
          
          {pending.length === 0 ? (
            <div className="bg-white p-8 rounded-3xl border border-slate-200/80 text-center space-y-2">
              <span className="text-3xl">✨</span>
              <p className="text-xs font-black text-slate-800">All Submissions Reviewed!</p>
              <p className="text-[11px] text-slate-400">There are no pending instructor courses requiring admin verification.</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {pending.map(c => (
                <div key={c.id} className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-md transition">
                  <div className="flex items-start gap-4">
                    <span className="text-4xl p-3 bg-amber-50 rounded-2xl border border-amber-100 shrink-0">
                      {c.thumbnail || '💻'}
                    </span>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase bg-amber-100 text-amber-800 border border-amber-200">
                          🟡 Pending Review
                        </span>
                        <span className="text-[10px] font-bold text-slate-400">{c.category || 'Development'}</span>
                      </div>
                      <h4 className="font-black text-sm text-slate-900">{c.title}</h4>
                      <p className="text-xs text-slate-500 line-clamp-1">{c.description || 'Enterprise tech course module.'}</p>
                      <div className="text-[10px] font-bold text-purple-600 pt-1">
                        Author: {c.instructor?.name || 'Instructor Alex'} • Tuition: ${c.price || 99}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleApprove(c.id)}
                    className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl text-xs font-black shadow-md shadow-purple-600/20 hover:scale-105 active:scale-95 transition flex items-center justify-center gap-1.5 shrink-0 cursor-pointer"
                  >
                    <Check className="h-4 w-4" /> Approve & Publish
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'published' && (
        <div className="space-y-4">
          <h3 className="text-xs font-black text-slate-500 uppercase tracking-wider">Live Catalog Courses</h3>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {published.map(c => (
              <div key={c.id} className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm space-y-3">
                <div className="flex justify-between items-start">
                  <span className="text-3xl">{c.thumbnail || '💻'}</span>
                  <span className="px-2.5 py-1 rounded-full text-[9px] font-black uppercase bg-emerald-50 text-emerald-700 border border-emerald-200">
                    🟢 Published Live
                  </span>
                </div>
                <div>
                  <h4 className="font-black text-xs text-slate-900 truncate">{c.title}</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">{c.description}</p>
                </div>
                <div className="pt-3 border-t border-slate-100 flex justify-between items-center text-xs font-black text-slate-800">
                  <span>${c.price || 999.00}</span>
                  <span className="text-[10px] font-bold text-purple-600">Verified</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
