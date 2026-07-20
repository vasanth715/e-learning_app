import React from 'react';
import { BookOpen, ShieldCheck, Award } from 'lucide-react';

export default function ExpertiseSection() {
  return (
    <section className="space-y-6 text-left">
      <h2 className="text-sm font-black text-slate-400 uppercase tracking-widest text-center">Our Core Expertise</h2>
      <div className="grid sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 space-y-3">
          <div className="h-10 w-10 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600">
            <BookOpen className="h-5 w-5" />
          </div>
          <h3 className="font-extrabold text-xs text-slate-800">Advanced Programming</h3>
          <p className="text-[10px] text-slate-400 leading-relaxed">Full-stack development, Spring Boot, REST APIs, and microservices.</p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 space-y-3">
          <div className="h-10 w-10 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <h3 className="font-extrabold text-xs text-slate-800">Interactive Quizzes</h3>
          <p className="text-[10px] text-slate-400 leading-relaxed">Auto-graded practice assessments to lock learning retention.</p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 space-y-3">
          <div className="h-10 w-10 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
            <Award className="h-5 w-5" />
          </div>
          <h3 className="font-extrabold text-xs text-slate-800">Printable Credentials</h3>
          <p className="text-[10px] text-slate-400 leading-relaxed">Instantly verify and export completed certification credentials.</p>
        </div>
      </div>
    </section>
  );
}
